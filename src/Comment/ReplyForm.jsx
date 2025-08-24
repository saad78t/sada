import styled from "styled-components";
import UserAvatar from "../components/Post/UserAvatar";
import TextareaAutosize from "react-textarea-autosize";
import { useForm } from "react-hook-form";

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
  background: #e0245e;
  color: white;
  border: none;
  padding: 0.6rem 0.8rem;
  border-radius: 9999px;
  cursor: pointer;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #c81e50;
  }
`;

const ReplyForm = ({
  onSubmit,
  onCancel,
  cancelText,
  buttonText = "Reply",
  placeholder = "Write a reply...",
  depth,
  className,
}) => {
  const { register, handleSubmit, reset, watch } = useForm();

  const onFormSubmit = ({ text }) => {
    if (!text.trim()) return;
    onSubmit(text.trim());
    reset();
  };

  const text = watch("text");
  const trimmedText = (text || "").trim();

  const lang = /[\u0600-\u06FF]/.test(text) ? "ar" : "en";

  return (
    <FormContainer className={className}>
      <UserAvatar username="you" profilePictureUrl={null} depth={depth} />
      <InputArea>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Textarea
            {...register("text")}
            minRows={1}
            placeholder={placeholder}
            $lang={lang}
            style={{
              overflow: "auto",
              resize: "none",
            }}
          />
          <ButtonRow>
            {onCancel && (
              <CancelButton type="button" onClick={onCancel}>
                {cancelText}
              </CancelButton>
            )}
            <SubmitButton type="submit" disabled={!trimmedText}>
              {buttonText}
            </SubmitButton>
          </ButtonRow>
        </form>
      </InputArea>
    </FormContainer>
  );
};

export default ReplyForm;
