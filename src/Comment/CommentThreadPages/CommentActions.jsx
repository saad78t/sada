// import styled from "styled-components";
// import { MessageCircle, ThumbsUp } from "lucide-react";
// import { useMemo } from "react";
// import { useGetLikesMap } from "../../hooks/useGetLikesMap";

// const CommentAction = styled.div`
//   display: flex;
//   gap: 1rem;
//   align-items: center;
//   margin-top: 0.5rem;
// `;

// const ActionButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   gap: 0.3rem;
//   color: ${({ theme }) => theme.textColor};
//   font-size: 0.85rem;
// `;

// function CommentActions({
//   comment,
//   commentId,
//   setReplyingTo,
//   setOpenReplies,
//   nestedReplies,
//   hideLikeButton = false,
// }) {
//   const isMainComment = comment.id === Number(commentId);
//   const visibleReplies = useMemo(() => {
//     return nestedReplies.filter((reply) => !reply.is_deleted);
//   }, [nestedReplies]);

//   const { likesMap, isLoading: likesLoading } = useGetLikesMap("comment", [
//     comment.id,
//   ]);
//   const likes = likesMap?.get(Number(comment.id)) || [];

//   const toggleReplies = (commentId) => {
//     setOpenReplies((prev) => ({
//       ...prev,
//       [commentId]: !prev[commentId],
//     }));
//     setReplyingTo(null);
//   };
//   return (
//     <CommentAction>
//       <ActionButton
//         onClick={
//           isMainComment || visibleReplies.length === 0
//             ? null
//             : () => toggleReplies(comment.id)
//         }
//       >
//         <MessageCircle size={16} />
//         {visibleReplies.length > 0 && <span>{visibleReplies.length}</span>}
//       </ActionButton>

//       <ActionButton>
//         {!hideLikeButton && (
//           <>
//             <ThumbsUp size={16} />
//             {likesLoading ? "..." : likes.length > 0 ? likes.length : null}
//           </>
//         )}
//       </ActionButton>
//     </CommentAction>
//   );
// }

// export default CommentActions;

import styled from "styled-components";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { useMemo } from "react";
import { useGetLikesMap } from "../../hooks/useGetLikesMap";

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

  const visibleReplies = useMemo(() => {
    return nestedReplies.filter((reply) => !reply.is_deleted);
  }, [nestedReplies]);

  const { likesMap, isLoading: likesLoading } = useGetLikesMap("comment", [
    comment.id,
  ]);
  const likes = likesMap?.get(Number(comment.id)) || [];

  const toggleReplies = (commentId) => {
    setOpenReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
    setReplyingTo(null);
  };

  const disableRepliesButton = isMainComment || visibleReplies.length === 0;

  return (
    <CommentAction>
      <ActionButton
        onClick={
          disableRepliesButton ? undefined : () => toggleReplies(comment.id)
        }
        disabled={disableRepliesButton}
      >
        <MessageCircle size={16} />
        {visibleReplies.length > 0 && <span>{visibleReplies.length}</span>}
      </ActionButton>

      {!hideLikeButton && (
        <ActionButton>
          <ThumbsUp size={16} />
          {likesLoading ? "..." : likes.length > 0 ? likes.length : null}
        </ActionButton>
      )}
    </CommentAction>
  );
}

export default CommentActions;
