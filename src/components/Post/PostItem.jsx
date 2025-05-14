import styled from "styled-components";
import { Link } from "react-router-dom";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostActions from "./PostActions";

const PostItemWrapper = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const PostBodyLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const PostItem = ({ post }) => {
  const { content, media_urls, id } = post;

  const isOnlyMedia =
    Array.isArray(media_urls) && media_urls.length > 0 && !content;
  const isImageOnly =
    Array.isArray(media_urls) &&
    media_urls.length > 0 &&
    media_urls.every((url) => !url.endsWith(".mp4"));
  const disableLink = isOnlyMedia && isImageOnly && media_urls.length <= 4;

  return (
    <PostItemWrapper>
      <PostHeader
        username={post.users?.username || post.username}
        createdAt={post.created_at}
        avatarUrl={post.users?.profile_picture_url}
        postId={id}
      />

      {disableLink ? (
        <PostContent content={content} mediaUrls={media_urls} />
      ) : (
        <PostBodyLink to={`/post/${id}`}>
          <PostContent content={content} mediaUrls={media_urls} />
        </PostBodyLink>
      )}

      <PostActions postId={id} />
    </PostItemWrapper>
  );
};

export default PostItem;
