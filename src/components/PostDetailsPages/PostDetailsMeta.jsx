import styled from "styled-components";
import { formatDistanceToNow } from "date-fns";
// import { useGetLikes } from "../../hooks/useLikes";
import { formatCount } from "../../utils/helpers";
import { useGetComments } from "../../hooks/useComments";
// import { useMemo } from "react";
// import { useGetLikesMap } from "../../hooks/useGetLikesMap";

const MetaWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
  color: #666;
  margin: 0.5rem 0;
`;

function PostDetailsMeta({ post }) {
  const { comments, commentsLoading } = useGetComments(post.id);
  // const { likes, likesLoading } = useGetLikes(post.id);

  // const commentIds = useMemo(() => comments.map((c) => c.id), [comments]);
  // const { likesMap, isLoading: likesLoading } = useGetLikesMap(
  //   "comment",
  //   commentIds
  // );

  return (
    <MetaWrapper>
      <span>
        {/* 💙 {likesLoading ? "..." : formatCount(likesMap.length)} Likes */}
        💙 Likes
      </span>
      <span>
        💬 {commentsLoading ? "..." : formatCount(comments.length)} Comments
      </span>
      <span>📅 {formatDistanceToNow(new Date(post.created_at))} ago</span>
    </MetaWrapper>
  );
}

export default PostDetailsMeta;
