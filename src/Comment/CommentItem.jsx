import { useState, useRef } from "react";
import styled from "styled-components";
import UserAvatar from "../components/Post/UserAvatar";
import TreeLineSVG from "./TreeLineSVG";
import { IoSendSharp } from "react-icons/io5";
import CommentActions from "./CommentActions";
import CommentHeader from "./CommentHeader";
import { useAddComment } from "../hooks/useComments";
import CommentContainer from "./CommentItemParts/CommentContainer";
import ReplyFormStyled from "./CommentItemParts/ReplyFormStyledWrapper";
import ReplyViewButton from "./CommentItemParts/ReplyViewButton";
import RepliesContainer from "./CommentItemParts/RepliesContainer";
import useReplyTreeLayout from "./CommentItemParts/useReplyTreeLayout";

const CommentBody = styled.div`
  flex: 1;
`;

const CommentText = styled.p`
  margin: 4px 0;
  line-height: 1.4;
  direction: ${({ $lang }) => ($lang === "ar" ? "rtl" : "ltr")};
`;

const CommentItem = ({ comment, comments, depth = 0 }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replying, setReplying] = useState(false);
  // const [showNewTree, setShowNewTree] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const [branchPositions, setBranchPositions] = useState([]);
  const containerRef = useRef(null);
  const replyRefs = useRef([]);

  const replies = comments?.filter((c) => c.parent_comment_id === comment.id);
  const lang = /[\u0600-\u06FF]/.test(comment.content) ? "ar" : "en";
  const { mutate: addCommentMutate } = useAddComment(comment.post_id);

  useReplyTreeLayout({
    showReplies,
    replyRefs,
    containerRef,
    replying,
    setContainerHeight,
    setBranchPositions,
  });

  return (
    <div>
      <CommentContainer ref={containerRef}>
        {replies?.length > 0 && (
          <TreeLineSVG
            height={containerHeight - 55}
            // showNewTree={showNewTree}
            showNewTree={showReplies}
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
                // setShowNewTree(!showNewTree);
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
