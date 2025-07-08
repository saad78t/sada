import styled from "styled-components";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";
import { formatCount } from "../../utils/helpers";
import { usePostStatus } from "../../hooks/usePostStats";

const ActionsWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 0.5rem 0;
  margin-left: 52px;
  padding-right: 16px;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  width: auto;
  box-sizing: content-box;
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

const PostActions = ({ postId, showCounts = true }) => {
  const { likes, likesLoading, comments, commentsLoading } =
    usePostStatus(postId);

  return (
    <ActionsWrapper onClick={(e) => e.stopPropagation()}>
      <ActionButton>
        <FaHeart />{" "}
        {showCounts && (likesLoading ? "..." : formatCount(likes.length))}
      </ActionButton>
      <ActionButton>
        <FaComment />{" "}
        {showCounts && (commentsLoading ? "..." : formatCount(comments.length))}
      </ActionButton>
      <ActionButton>
        <FaShare />
      </ActionButton>
    </ActionsWrapper>
  );
};

export default PostActions;
