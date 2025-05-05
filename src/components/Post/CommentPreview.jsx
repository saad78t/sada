import styled from "styled-components";

const PreviewWrapper = styled.div`
  padding: 0.5rem 0;
`;

const CommentText = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 0.3rem;
`;

const ViewAll = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.buttonHover};
  font-size: 0.85rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const CommentPreview = () => {
  return (
    <PreviewWrapper>
      <CommentText>
        <strong>Ahmed:</strong> Nice post!
      </CommentText>
      <CommentText>
        <strong>Fatima:</strong> Thanks for sharing 😊
      </CommentText>
      <ViewAll>View all comments</ViewAll>
    </PreviewWrapper>
  );
};

export default CommentPreview;
