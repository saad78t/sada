// import styled from "styled-components";

// const CommentText = styled.div`
//   margin: 0.25rem 0;
//   direction: ${({ content }) =>
//     /[\u0600-\u06FF]/.test(content) ? "rtl" : "ltr"};
//   text-align: start;
//   cursor: pointer;
// `;

// function CommentContentText({ comment, setReplyingTo }) {
//   return (
//     <CommentText
//       content={comment.content}
//       onClick={() => setReplyingTo(comment)}
//     >
//       {comment.content}
//     </CommentText>
//   );
// }

// export default CommentContentText;
import styled from "styled-components";

const CommentText = styled.div`
  margin: 0.25rem 0;
  direction: ${({ content }) =>
    /[\u0600-\u06FF]/.test(content) ? "rtl" : "ltr"};
  text-align: start;
  cursor: pointer;
`;

function CommentContentText({ comment, setReplyingTo }) {
  return (
    <CommentText
      content={comment.content}
      onClick={() => setReplyingTo(comment.id)}
    >
      {comment.content}
    </CommentText>
  );
}

export default CommentContentText;
