import styled from "styled-components";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";
import { formatCount } from "../../utils/helpers";
// import { useGetLikes } from "../../hooks/useLikes";
import { useGetComments } from "../../hooks/useComments";

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

const PostActions = ({ postId, showCounts = true, likesMap, likesLoading }) => {
  const { comments, commentsLoading } = useGetComments(postId);
  // const { likes, likesLoading } = useGetLikes(postId, "post");

  likesLoading && !likesMap;
  const likes = likesMap?.get?.(postId) || [];

  // console.log("POST ID RECEIVED:", postId);

  return (
    <ActionsWrapper onClick={(e) => e.stopPropagation()}>
      <ActionButton>
        <FaHeart />{" "}
        {showCounts &&
          (likesLoading
            ? "..."
            : likes.length > 0
            ? formatCount(likes.length)
            : null)}
      </ActionButton>
      <ActionButton>
        <FaComment />{" "}
        {showCounts &&
          (commentsLoading
            ? "..."
            : comments.length
            ? formatCount(comments.length)
            : null)}
      </ActionButton>
      <ActionButton>
        <FaShare />
      </ActionButton>
    </ActionsWrapper>
  );
};

export default PostActions;
