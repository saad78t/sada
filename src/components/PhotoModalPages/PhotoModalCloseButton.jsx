import styled from "styled-components";
import { X } from "lucide-react";

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  cursor: pointer;
  color: white;
  padding: 0.3rem;
  border-radius: 50%;
  z-index: 30;
`;

function PhotoModalCloseButton({ onClose }) {
  return (
    <CloseButton onClick={onClose}>
      <X />
    </CloseButton>
  );
}

export default PhotoModalCloseButton;
