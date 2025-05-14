import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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
  cursor: pointer;
`;

const PostItem = ({ post }) => {
  const navigate = useNavigate();
  const { content, media_urls, id } = post;

  const handleNavigate = () => navigate(`/post/${id}`);

  const isImageOnly =
    Array.isArray(media_urls) &&
    media_urls.length > 0 &&
    media_urls.every((url) => !url.endsWith(".mp4"));

  const disableLink = isImageOnly && media_urls.length <= 4;

  return (
    <PostItemWrapper onClick={!disableLink ? handleNavigate : undefined}>
      <PostHeader
        username={post.users?.username || post.username}
        createdAt={post.created_at}
        avatarUrl={post.users?.profile_picture_url}
        postId={id}
      />
      <PostContent
        content={content}
        mediaUrls={media_urls}
        disableNavigation={disableLink}
      />
      <PostActions postId={id} />
    </PostItemWrapper>
  );
};

export default PostItem;
