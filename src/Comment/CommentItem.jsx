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

// Returns true only if the comment is deleted AND all of its replies (and their nested replies) are also deleted.
const isThreadFullyDeleted = (comment, repliesMap) => {
  if (!comment.is_deleted) return false;

  const replies = repliesMap.get(comment.id) || [];
  if (!replies || replies.length === 0) return true;

  return replies.every((reply) => isThreadFullyDeleted(reply, repliesMap));
};

const CommentItem = ({ comment, comments, repliesMap, depth = 0 }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replying, setReplying] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const [branchPositions, setBranchPositions] = useState([]);
  const containerRef = useRef(null);
  const replyRefs = useRef([]);

  /*
  * Used a Map to build repliesMap once instead of filtering for each comment — improves performance for large comment trees and keeps parent-child relationships organized.
  * Map was used in the parent PhotoModalCommentsList component instead of this line to avoid duplication every time we get replies using the filter function.
  const replies = comments?.filter((c) => c.parent_comment_id === comment.id);
  */

  //Give me all replies to this current comment (comment.id). If there are no replies (i.e. undefined), return an empty array instead of returning undefined and ruining the job.
  const replies = repliesMap.get(comment.id) || [];

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

  // خزنت نتيجة الفنكشن لتجنب حسابها أكثر من مرة وتحسين الأداء والوضوح.
  const isFullyDeleted = isThreadFullyDeleted(comment, repliesMap);

  // Returning `null` from a React component means nothing will be rendered to the DOM — it's as if the component doesn't exist visually.
  if (isFullyDeleted) {
    return null;
  }

  // فلترة الردود لعرض الردود الغير محذوفة أو اللي عندها ردود غير محذوفة
  const visibleReplies = replies?.filter(
    (reply) => !isThreadFullyDeleted(reply, repliesMap)
  );

  return (
    <div>
      <CommentContainer ref={containerRef}>
        {visibleReplies?.length > 0 && (
          <TreeLineSVG
            height={containerHeight - 55}
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
          {comment.is_deleted ? (
            <CommentText style={{ fontStyle: "italic" }}>
              deleted comment 🗑️
            </CommentText>
          ) : (
            <>
              <CommentHeader comment={comment} />
              <CommentText $lang={lang}>{comment.content}</CommentText>
              <CommentActions replying={replying} setReplying={setReplying} />
            </>
          )}

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

          {visibleReplies?.length > 0 && (
            <ReplyViewButton
              onClick={() => {
                setShowReplies(!showReplies);
              }}
            >
              {showReplies
                ? "Hide replies"
                : `View all ${visibleReplies.length} replies`}
            </ReplyViewButton>
          )}
        </CommentBody>
      </CommentContainer>

      {showReplies && visibleReplies?.length > 0 && (
        <RepliesContainer>
          {visibleReplies.map((reply, index) => (
            <div key={reply.id} ref={(el) => (replyRefs.current[index] = el)}>
              <CommentItem
                comment={reply}
                comments={comments}
                depth={depth + 1}
                repliesMap={repliesMap}
              />
            </div>
          ))}
        </RepliesContainer>
      )}
    </div>
  );
};

export default CommentItem;
