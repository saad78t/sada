import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import UserAvatar from "../components/Post/UserAvatar";
import ReplyForm from "./ReplyForm";
import TreeLineSVG from "./TreeLineSVG";
import { IoSendSharp } from "react-icons/io5";
import CommentActions from "./CommentActions";
import CommentHeader from "./CommentHeader";
import { useAddComment } from "../hooks/useComments";

const CommentContainer = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1.75rem;
`;

const CommentBody = styled.div`
  flex: 1;
`;

const CommentText = styled.p`
  margin: 4px 0;
  line-height: 1.4;
  direction: ${({ $lang }) => ($lang === "ar" ? "rtl" : "ltr")};
`;

const RepliesContainer = styled.div`
  margin-top: 0.5rem;
  margin-left: 48px;
  position: relative;
`;

const ReplyViewButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #385898;
  font-size: 0.85rem;
  padding: 0;
  margin: 0.25rem 0 0 0;

  &:hover {
    text-decoration: underline;
  }
`;

const ReplyFormStyled = styled(ReplyForm)`
  position: relative;
  border-radius: 4px;
  padding: 0.5rem;
  margin-top: 0.5rem;
  textarea {
    min-height: 10px;
    border: 2px solid #0e0d0d52;
    background-color: #d4edda;
    border-radius: 5px;
  }

  button {
    position: absolute;
    padding: 0.4rem 0.7rem;
    right: 0.5rem;
    background-color: #1d9bf0;
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    cursor: pointer;
  }
`;

const CommentItem = ({ comment, comments, depth = 0 }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replying, setReplying] = useState(false);
  const [showNewTree, setShowNewTree] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const [branchPositions, setBranchPositions] = useState([]);
  const containerRef = useRef(null);
  const replyRefs = useRef([]);

  const replies = comments?.filter((c) => c.parent_comment_id === comment.id);
  const lang = /[\u0600-\u06FF]/.test(comment.content) ? "ar" : "en";
  const { mutate: addCommentMutate } = useAddComment(comment.post_id);

  useEffect(() => {
    let animationFrameId;

    const updatePositions = () => {
      if (showReplies && replyRefs.current.length) {
        const positions = replyRefs.current.map((ref) => {
          if (ref) {
            const rect = ref.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();
            return rect.top - containerRect.top + 16;
          }
          return 0;
        });
        setBranchPositions(positions);
      }
    };

    if (containerRef.current) {
      animationFrameId = requestAnimationFrame(() => {
        setContainerHeight(containerRef.current?.offsetHeight);
        updatePositions();
      });

      const resizeObserver = new ResizeObserver(() => {
        setContainerHeight(containerRef.current?.offsetHeight);
        updatePositions();
      });

      resizeObserver.observe(containerRef.current);
      replyRefs.current.forEach((ref) => {
        if (ref) resizeObserver.observe(ref);
      });

      return () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        resizeObserver.disconnect();
      };
    }
  }, [showReplies, replying]);

  return (
    <div>
      <CommentContainer ref={containerRef}>
        {replies?.length > 0 && (
          <TreeLineSVG
            height={containerHeight - 55}
            showNewTree={showNewTree}
            branchPositions={branchPositions}
          />
        )}

        <UserAvatar
          username={comment.users?.username}
          profilePictureUrl={comment.users?.profile_picture_url}
          style={{ position: "relative", zIndex: 1 }}
        />

        <CommentBody>
          <CommentHeader comment={comment} />
          <CommentText $lang={lang}>{comment.content}</CommentText>
          <CommentActions replying={replying} setReplying={setReplying} />

          {replying && (
            <ReplyFormStyled
              onSubmit={(content) =>
                addCommentMutate({
                  postId: comment.post_id,
                  content,
                  parentId: comment.id,
                })
              }
              buttonText={<IoSendSharp />}
            />
          )}

          {replies?.length > 0 && (
            <ReplyViewButton
              onClick={() => {
                setShowReplies(!showReplies);
                setShowNewTree(!showNewTree);
              }}
            >
              {showReplies
                ? "Hide replies"
                : `View all ${replies.length} replies`}
            </ReplyViewButton>
          )}
        </CommentBody>
      </CommentContainer>

      {showReplies && replies?.length > 0 && (
        <RepliesContainer>
          {replies.map((reply, index) => (
            <div key={reply.id} ref={(el) => (replyRefs.current[index] = el)}>
              <CommentItem
                comment={reply}
                comments={comments}
                depth={depth + 1}
              />
            </div>
          ))}
        </RepliesContainer>
      )}
    </div>
  );
};

export default CommentItem;
