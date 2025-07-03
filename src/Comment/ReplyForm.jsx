// import { useState } from "react";
// import styled from "styled-components";
// import UserAvatar from "../components/Post/UserAvatar";

// const FormContainer = styled.div`
//   display: flex;
//   align-items: flex-start;
//   gap: 0.75rem;
//   margin-bottom: 1.5rem;
// `;

// const InputArea = styled.div`
//   flex: 1;
// `;

// const Textarea = styled.textarea`
//   width: 100%;
//   resize: none;
//   padding: 0.75rem;
//   border-radius: 1rem;
//   border: 1px solid ${({ theme }) => theme.borderColor};
//   font-size: 1rem;
//   font-family: inherit;
//   background-color: ${({ theme }) => theme.inputBackground};
//   color: ${({ theme }) => theme.textColor};
//   direction: ${({ $lang }) => ($lang === "ar" ? "rtl" : "ltr")};
//   text-align: ${({ $lang }) => ($lang === "ar" ? "right" : "left")};
// `;

// const ButtonRow = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   gap: 0.5rem;
//   margin-top: 0.5rem;
// `;

// const SubmitButton = styled.button`
//   background-color: #1d9bf0;
//   color: white;
//   border: none;
//   padding: 0.4rem 1rem;
//   border-radius: 9999px;
//   font-weight: bold;
//   cursor: pointer;
//   font-size: 0.95rem;

//   &:disabled {
//     opacity: 0.5;
//     cursor: not-allowed;
//   }
// `;

// const CancelButton = styled.button`
//   background: none;
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
//   className,
// }) => {
//   const [text, setText] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!text.trim()) return;
//     onSubmit(text.trim());
//     setText("");
//   };

//   const lang = /[\u0600-\u06FF]/.test(text) ? "ar" : "en";

//   return (
//     <FormContainer className={className}>
//       <UserAvatar username="you" profilePictureUrl={null} />
//       <InputArea>
//         <form onSubmit={handleSubmit}>
//           <Textarea
//             rows="3"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             placeholder={placeholder}
//             $lang={lang}
//           />
//           <ButtonRow>
//             {onCancel && <CancelButton onClick={onCancel}>Cancel</CancelButton>}
//             <SubmitButton type="submit" disabled={!text.trim()}>
//               {buttonText}
//             </SubmitButton>
//           </ButtonRow>
//         </form>
//       </InputArea>
//     </FormContainer>
//   );
// };

// export default ReplyForm;

import { useState } from "react";
import styled from "styled-components";
import UserAvatar from "../components/Post/UserAvatar";
import TextareaAutosize from "react-textarea-autosize";

const FormContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const InputArea = styled.div`
  flex: 1;
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  min-height: 40px;
  max-height: 150px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 1rem;
  resize: none;
  overflow-y: auto;
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
  className,
}) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText("");
  };

  const lang = /[\u0600-\u06FF]/.test(text) ? "ar" : "en";

  return (
    <FormContainer className={className}>
      <UserAvatar username="you" profilePictureUrl={null} />
      <InputArea>
        <form onSubmit={handleSubmit}>
          {/* <Textarea
            rows="3"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
            $lang={lang}
          /> */}

          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            minRows={1}
            placeholder={placeholder}
            $lang={lang}
            style={{
              overflow: "hidden",
              resize: "none",
            }}
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
