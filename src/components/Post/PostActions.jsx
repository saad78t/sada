import styled from "styled-components";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getLikes } from "../../services/likeService";
import { getComments } from "../../services/commentService";
import { formatCount } from "../../utils/helpers";

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

const PostActions = ({ postId }) => {
  const { data: likes = [], isLoading: likesLoading } = useQuery({
    queryKey: ["likes", postId],
    queryFn: () => getLikes(postId),
  });

  const { data: comments = [], isLoading: commentsLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
  });

  return (
    <ActionsWrapper>
      <ActionButton>
        <FaHeart /> {likesLoading ? "..." : formatCount(likes.length)}
      </ActionButton>
      <ActionButton>
        <FaComment /> {commentsLoading ? "..." : formatCount(comments.length)}
      </ActionButton>
      <ActionButton>
        <FaShare />
      </ActionButton>
    </ActionsWrapper>
  );
};

export default PostActions;
