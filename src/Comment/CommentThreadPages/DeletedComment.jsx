// import { DeletedAvatar } from "../../Shared/DeletedAvater";
// import CommentActions from "./CommentActions";
// import {
//   CommentContainer,
//   CommentContent,
//   DeletedText,
//   RepliesWrapper,
// } from "./CommentThreadStyles";
// import RenderComment from "./RenderComment";

// function DeletedComment({ nestedReplies, comment, showReplies, depth }) {
//   return (
//     <CommentContainer>
//       <DeletedAvatar $depth={depth} />
//       <CommentContent>
//         <DeletedText $depth={depth}>deleted comment 🗑️</DeletedText>

//         {nestedReplies.length > 0 && (
//           <CommentActions
//             comment={comment}
//             nestedReplies={nestedReplies}
//             hideLikeButton
//             $depth={depth}
//           />
//         )}
//         {showReplies && (
//           <RepliesWrapper>
//             {nestedReplies.map((reply) => (
//               <RenderComment key={reply.id} comment={reply} depth={depth + 1} />
//             ))}
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
  DeletedText,
  RepliesWrapper,
} from "./CommentThreadStyles";
import RenderComment from "./RenderComment";
import styled from "styled-components";

// ستايل مخصص لتعليقات المحذوفة
const DeletedContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.2rem; /* فراغ بسيط بين العناصر */
  margin: 0; /* إزالة أي margin إضافي */
`;

function DeletedComment({ nestedReplies, comment, showReplies, depth }) {
  return (
    <CommentContainer>
      <DeletedAvatar $depth={depth} />
      <DeletedContent>
        <DeletedText $depth={depth}>deleted comment 🗑️</DeletedText>

        {nestedReplies.length > 0 && (
          <CommentActions
            comment={comment}
            nestedReplies={nestedReplies}
            hideLikeButton
            depth={depth}
          />
        )}

        {showReplies && (
          <RepliesWrapper>
            {nestedReplies.map((reply) => (
              <RenderComment key={reply.id} comment={reply} depth={depth + 1} />
            ))}
          </RepliesWrapper>
        )}
      </DeletedContent>
    </CommentContainer>
  );
}

export default DeletedComment;
