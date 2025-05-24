// import styled from "styled-components";
// import { useState } from "react";
// import Button from "../Shared/Button";

// const FormWrapper = styled.form`
//   margin-top: 0.5rem;
// `;

// const Input = styled.textarea`
//   width: 100%;
//   padding: 0.5rem;
//   border: 1px solid ${({ theme }) => theme.borderColor};
//   border-radius: 8px;
//   resize: none;
//   background-color: ${({ theme }) => theme.bgColor};
//   color: ${({ theme }) => theme.textColor};
//   font-size: 0.9rem;
// `;

// const ButtonsRow = styled.div`
//   margin-top: 0.3rem;
//   display: flex;
//   justify-content: flex-end;
//   gap: 0.5rem;
// `;

// const ReplyButton = styled.button`
//   background-color: ${({ theme }) => theme.buttonBg};
//   color: ${({ theme }) => theme.buttonText};
//   border: none;
//   padding: 0.4rem 0.8rem;
//   border-radius: 6px;
//   cursor: pointer;

//   &:hover {
//     background-color: ${({ theme }) => theme.buttonHover};
//   }
// `;

// const CancelButton = styled.button`
//   background: transparent;
//   border: none;
//   color: ${({ theme }) => theme.textColor};
//   cursor: pointer;
//   font-size: 0.9rem;
// `;

// const ReplyForm = ({
//   onSubmit,
//   onCancel,
//   buttonText = "Reply",
//   placeholder = "Write a reply...",
// }) => {
//   const [content, setContent] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!content.trim()) return;
//     onSubmit(content);
//     setContent("");
//   };

//   return (
//     <FormWrapper onSubmit={handleSubmit}>
//       <Input
//         rows={3}
//         placeholder={placeholder}
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//       />
//       <ButtonsRow>
//         {onCancel && (
//           <Button type="button" onClick={onCancel}>
//             Cancel
//           </Button>
//         )}
//         <Button type="submit">{buttonText}</Button>
//       </ButtonsRow>
//     </FormWrapper>
//   );
// };

// export default ReplyForm;

import { useState } from "react";
import styled from "styled-components";
import UserAvatar from "../components/Post/UserAvatar";

const FormContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const InputArea = styled.div`
  flex: 1;
`;

const Textarea = styled.textarea`
  width: 100%;
  resize: none;
  padding: 0.75rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
  font-size: 1rem;
  font-family: inherit;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.textColor};
  direction: ${({ value }) => (/[\u0600-\u06FF]/.test(value) ? "rtl" : "ltr")};
  text-align: start;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const SubmitButton = styled.button`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  font-weight: bold;
  cursor: pointer;
  font-size: 0.95rem;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  font-size: 0.9rem;
`;

const ReplyForm = ({
  onSubmit,
  onCancel,
  buttonText = "Reply",
  placeholder = "Write a reply...",
}) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText("");
  };

  return (
    <FormContainer>
      <UserAvatar username="you" profilePictureUrl={null} />
      <InputArea>
        <form onSubmit={handleSubmit}>
          <Textarea
            rows="3"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
          />
          <ButtonRow>
            {onCancel && <CancelButton onClick={onCancel}>Cancel</CancelButton>}
            <SubmitButton type="submit" disabled={!text.trim()}>
              {buttonText}
            </SubmitButton>
          </ButtonRow>
        </form>
      </InputArea>
    </FormContainer>
  );
};

export default ReplyForm;
