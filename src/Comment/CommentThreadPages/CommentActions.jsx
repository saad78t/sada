import styled from "styled-components";
import { MessageCircle, ThumbsUp } from "lucide-react";

const CommentAction = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 0.5rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: ${({ theme }) => theme.textColor};
  font-size: 0.85rem;
`;

function CommentActions({
  comment,
  commentId,
  setReplyingTo,
  setOpenReplies,
  nestedReplies,
  hideLikeButton = false,
}) {
  const isMainComment = comment.id === Number(commentId);

  const toggleReplies = (commentId) => {
    setOpenReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
    setReplyingTo(null);
  };
  return (
    <CommentAction>
      <ActionButton
        onClick={isMainComment ? null : () => toggleReplies(comment.id)}
      >
        <MessageCircle size={16} />
        {nestedReplies.length > 0 && <span>{nestedReplies.length}</span>}
      </ActionButton>
      <ActionButton>{!hideLikeButton && <ThumbsUp size={16} />}</ActionButton>
    </CommentAction>
  );
}

export default CommentActions;
