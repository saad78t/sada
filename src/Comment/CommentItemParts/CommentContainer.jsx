import styled from "styled-components";

// const CommentContainer = styled.div`
//   position: relative;
//   display: flex;
//   align-items: flex-start;
//   gap: 0.1rem;
//   margin-bottom: 1.75rem;
// `;

const CommentContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr; /* أفاتار | محتوى مرن */
  column-gap: 0.1rem;
  align-items: start;
  margin-bottom: 1.75rem;
  min-width: 0; /* ضروري حتى المحتوى ما يطلع برّه */
`;

export default CommentContainer;
