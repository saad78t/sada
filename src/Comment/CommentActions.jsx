import styled from "styled-components";
import { ThumbsUp } from "lucide-react";
// import { useGetLikes } from "../hooks/useLikes";
import { useGetLikesMap } from "../hooks/useGetLikesMap";
import { useMemo } from "react";

const CommentsActions = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: #1a1a1a;
  margin: 0.5rem 0;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    text-decoration: underline;
  }
`;

function CommentActions({ replying, setReplying, comments, comment }) {
  // const { likes, likesLoading } = useGetLikes(comment.id, "comment");

  const commentIds = useMemo(() => comments.map((c) => c.id), [comments]);
  const { likesMap, isLoading: likesLoading } = useGetLikesMap(
    "comment",
    commentIds
  );
  const likes = likesMap?.get(comment.id) || [];

  return (
    <div>
      <CommentsActions>
        <ActionButton>
          <ThumbsUp size={14} />
          {likesLoading ? "..." : likes.length > 0 ? likes.length : null}
        </ActionButton>
        <ActionButton onClick={() => setReplying(!replying)}>
          Reply
        </ActionButton>
      </CommentsActions>
    </div>
  );
}

export default CommentActions;
