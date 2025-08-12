// import { DeletedAvatar } from "../../Shared/DeletedAvater";
// import CommentActions from "./CommentActions";
// import {
//   CommentContainer,
//   CommentContent,
//   RepliesWrapper,
// } from "./CommentThreadStyles";

// function DeletedComment({
//   nestedReplies,
//   comment,
//   commentId,
//   setReplyingTo,
//   setOpenReplies,
//   showReplies,
//   renderComment,
// }) {
//   return (
//     <CommentContainer>
//       <DeletedAvatar />
//       <CommentContent>
//         <p style={{ fontStyle: "italic", marginTop: " 10px" }}>
//           {" "}
//           deleted comment 🗑️
//         </p>

//         {nestedReplies.length > 0 && (
//           <CommentActions
//             comment={comment}
//             commentId={commentId}
//             setReplyingTo={setReplyingTo}
//             setOpenReplies={setOpenReplies}
//             nestedReplies={nestedReplies}
//             hideLikeButton
//           />
//         )}
//         {showReplies && (
//           <RepliesWrapper>
//             {nestedReplies.map((reply) => renderComment(reply))}
//           </RepliesWrapper>
//         )}
//       </CommentContent>
//     </CommentContainer>
//   );
// }

// export default DeletedComment;

import { DeletedAvatar } from "../../Shared/DeletedAvater";
import CommentActions from "./CommentActions";
import {
  CommentContainer,
  CommentContent,
  RepliesWrapper,
} from "./CommentThreadStyles";

function DeletedComment({
  nestedReplies,
  comment,
  commentId,
  setReplyingTo,
  setOpenReplies,
  showReplies,
  // eslint-disable-next-line no-unused-vars
  RenderComment,
  repliesMap, // أضفت هذا
  openReplies, // أضفت هذا
  deleteCommentMutate, // أضفت هذا
}) {
  return (
    <CommentContainer>
      <DeletedAvatar />
      <CommentContent>
        <p style={{ fontStyle: "italic", marginTop: "10px" }}>
          deleted comment 🗑️
        </p>

        {nestedReplies.length > 0 && (
          <CommentActions
            comment={comment}
            commentId={commentId}
            setReplyingTo={setReplyingTo}
            setOpenReplies={setOpenReplies}
            nestedReplies={nestedReplies}
            hideLikeButton
          />
        )}
        {showReplies && (
          <RepliesWrapper>
            {nestedReplies.map((reply) => (
              <RenderComment
                key={reply.id}
                comment={reply}
                commentId={commentId}
                setReplyingTo={setReplyingTo}
                setOpenReplies={setOpenReplies}
                repliesMap={repliesMap} // مررت هذا
                openReplies={openReplies} // مررت هذا
                deleteCommentMutate={deleteCommentMutate} // مررت هذا
              />
            ))}
          </RepliesWrapper>
        )}
      </CommentContent>
    </CommentContainer>
  );
}

export default DeletedComment;
