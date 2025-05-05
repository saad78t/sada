import styled from "styled-components";

const PostDetailsContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 1rem;

  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const PostWrapper = styled.div`
  margin-bottom: 2rem;
`;

const CommentsSection = styled.div`
  margin-top: 2rem;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const CommentInput = styled.textarea`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  resize: vertical;
  min-height: 100px;

  @media (max-width: 480px) {
    min-height: 80px;
  }
`;

const SubmitCommentButton = styled.button`
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 0.5rem 0.75rem;
  }
`;

const PostDetails = () => {
  return (
    <PostDetailsContainer>
      <PostWrapper>{/* هنا سيتم إدراج مكون البوست لاحقًا */}</PostWrapper>

      <CommentsSection>
        {/* هنا قائمة التعليقات */}
        <CommentForm>
          <CommentInput placeholder="Write a comment..." />
          <SubmitCommentButton>Comment</SubmitCommentButton>
        </CommentForm>
      </CommentsSection>
    </PostDetailsContainer>
  );
};

export default PostDetails;
