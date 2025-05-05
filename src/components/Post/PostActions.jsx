import styled from "styled-components";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";

const ActionsWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 0.5rem 0;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.textColor};
  font-size: 0.95rem;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.buttonHover};
  }
`;

const PostActions = () => {
  return (
    <ActionsWrapper>
      <ActionButton>
        <FaHeart /> 12
      </ActionButton>
      <ActionButton>
        <FaComment /> 3
      </ActionButton>
      <ActionButton>
        <FaShare />
      </ActionButton>
    </ActionsWrapper>
  );
};

export default PostActions;
