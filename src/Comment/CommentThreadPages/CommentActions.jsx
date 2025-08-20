import styled from "styled-components";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { useMemo } from "react";
// import { useGetLikesMap } from "../../hooks/useGetLikesMap";
import { useThreadContext } from "./CommentThreadContext";
import { getSizeByDepth, isThreadFullyDeleted } from "../../utils/helpers";

const CommentAction = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 0.5rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: ${({ theme }) => theme.textColor};
  font-size: ${({ $depth }) => getSizeByDepth($depth, "actions")};
`;

function CommentActions({
  comment,
  nestedReplies,
  hideLikeButton = false,
  depth,
}) {
  const {
    setReplyingTo,
    setOpenReplies,
    commentId,
    repliesMap,
    likesMap,
    likesLoading,
  } = useThreadContext();
  const isMainComment = comment.id === Number(commentId);

  const visibleReplies = useMemo(() => {
    return nestedReplies.filter(
      (reply) => !isThreadFullyDeleted(reply, repliesMap)
    );
  }, [nestedReplies, repliesMap]);

  //هذا الاسلوب يسمى ليزي يستخدم فقط اذا كان عندي الاف التعليقات وعليها الاف اللايكات فيجلب العدد فقط  عندما نستعرض التعليقات تاتي عدد اللايكات
  // const { likesMap, isLoading: likesLoading } = useGetLikesMap("comment", [
  //   comment.id,
  // ]);
  const likes = likesMap?.get(Number(comment.id)) || [];

  // const toggleReplies = (commentId) => {
  //   setOpenReplies((prev) => ({
  //     ...prev,
  //     [commentId]: !prev[commentId],
  //   }));
  //   setReplyingTo(null);
  // };

  const disableRepliesButton = isMainComment || visibleReplies.length === 0;

  return (
    <CommentAction>
      <ActionButton
        $depth={depth}
        onClick={
          disableRepliesButton
            ? undefined
            : () => {
                setOpenReplies(comment.id);
                setReplyingTo(null);
              }
        }
        disabled={disableRepliesButton}
      >
        <MessageCircle size={parseInt(getSizeByDepth(depth, "actions"))} />
        {visibleReplies.length > 0 && <span>{visibleReplies.length}</span>}
      </ActionButton>

      {!hideLikeButton && (
        <ActionButton $depth={depth}>
          <ThumbsUp size={parseInt(getSizeByDepth(depth, "actions"))} />
          {likesLoading ? "..." : likes.length > 0 ? likes.length : null}
        </ActionButton>
      )}
    </CommentAction>
  );
}

export default CommentActions;
