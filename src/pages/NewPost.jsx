import styled from "styled-components";

const NewPostContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  min-height: 150px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
`;

const NewPost = () => {
  return (
    <NewPostContainer>
      <Form>
        <TextArea placeholder="What's on your mind?" />
        <SubmitButton>Post</SubmitButton>
      </Form>
    </NewPostContainer>
  );
};

export default NewPost;
