import styled from "styled-components";
import { formatDistanceToNow } from "date-fns";
import { usePostStatus } from "../../hooks/usePostStats";
import { formatCount } from "../../utils/helpers";

const MetaWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
  color: #666;
  margin: 0.5rem 0;
`;

function PostDetailsMeta({ post }) {
  const { likes, comments } = usePostStatus(post.id);

  return (
    <MetaWrapper>
      <span>💙 {formatCount(likes.length)} Likes</span>
      <span>💬 {formatCount(comments.length)} Comments</span>
      <span>📅 {formatDistanceToNow(new Date(post.created_at))} ago</span>
    </MetaWrapper>
  );
}

export default PostDetailsMeta;
