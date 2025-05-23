import { useState } from "react";
import styled from "styled-components";

const FormWrapper = styled.form`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
`;

const Input = styled.textarea`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 8px;
  resize: none;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  font-size: 0.9rem;
`;

const ReplyButton = styled.button`
  align-self: flex-end;
  margin-top: 0.5rem;
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

const ReplyForm = ({ parentId, onSubmit }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit(content, parentId);
    setContent(""); // Clear after submit
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Input
        rows="2"
        placeholder="اكتب ردّك هنا..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <ReplyButton type="submit">رد</ReplyButton>
    </FormWrapper>
  );
};

export default ReplyForm;
