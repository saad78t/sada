import styled from "styled-components";
import { useState } from "react";

const FormWrapper = styled.form`
  margin-top: 0.5rem;
`;

const Input = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 8px;
  resize: none;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  font-size: 0.9rem;
`;

const ButtonsRow = styled.div`
  margin-top: 0.3rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const ReplyButton = styled.button`
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
`;

const CancelButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  font-size: 0.9rem;
`;

const ReplyForm = ({ onSubmit, onCancel }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content);
    setContent("");
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Input
        rows={3}
        placeholder="Write your reply..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <ButtonsRow>
        <CancelButton type="button" onClick={onCancel}>
          Cancel
        </CancelButton>
        <ReplyButton type="submit">Reply</ReplyButton>
      </ButtonsRow>
    </FormWrapper>
  );
};

export default ReplyForm;
