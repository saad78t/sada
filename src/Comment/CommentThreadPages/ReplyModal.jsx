import styled from "styled-components";
import { IoSendSharp } from "react-icons/io5";
import ReplyFormStyled from "./ReplyFormStyled";

const ModalContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  padding: 1rem;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.2rem;
  position: absolute;
  top: 8px;
  right: 12px;
  cursor: pointer;
`;

const ReplyModal = ({ replyingTo, onClose, onSubmit }) => {
  if (!replyingTo) return null;

  return (
    <ModalContainer>
      {/* <CloseButton onClick={onClose}>❌</CloseButton> */}
      <h4>رد على: {replyingTo.users?.username}</h4>
      <ReplyFormStyled
        onSubmit={(content) => {
          onSubmit(content);
          onClose();
        }}
        buttonText={<IoSendSharp />}
        onCancel={(e) => {
          e.preventDefault();
          onClose();
        }}
        cancelText={"❌"}
      />
    </ModalContainer>
  );
};

export default ReplyModal;
