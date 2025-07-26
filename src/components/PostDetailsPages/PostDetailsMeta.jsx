import styled from "styled-components";
import { formatDistanceToNow } from "date-fns";
import { formatCount } from "../../utils/helpers";
import { useGetComments } from "../../hooks/useComments";
import { useCachedPostLikes } from "../../hooks/useCachedPostLikes";
import { useMemo } from "react";

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

  /*
  //بالكورس راح اشرح هذا الجزء اول مره
  const postIds = useMemo(() => [Number(post.id)], [post.id]);
  const { likesMap, isLoading: likesLoading } = useGetLikesMap("post", postIds);
  if (likesLoading || !likesMap) return <Spinner />;
  const likes = likesMap.get(post.id) || [];*/

  const { finalLikesMap, likesLoading } = useCachedPostLikes(post.id);
  const likes = finalLikesMap.get(post.id) || [];

  const visibleComments = useMemo(
    () => comments.filter((c) => !c.is_deleted),
    [comments]
  );

  return (
    <MetaWrapper>
      <span>💙 {likesLoading ? "..." : formatCount(likes.length)} Likes</span>
      <span>
        💬 {commentsLoading ? "..." : formatCount(visibleComments.length)}{" "}
        Comments
      </span>
      <span>📅 {formatDistanceToNow(new Date(post.created_at))} ago</span>
    </MetaWrapper>
  );
}

export default PostDetailsMeta;
