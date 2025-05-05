// components/Post/PostItem.jsx
import styled from "styled-components";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostActions from "./PostActions";
import CommentPreview from "./CommentPreview";

const PostItemWrapper = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const PostItem = ({ post }) => {
  return (
    <PostItemWrapper>
      <PostHeader
        username={post.users?.username || post.username}
        createdAt={post.created_at}
      />
      <PostContent content={post.content} mediaUrl={post.media_url} />
      <PostActions postId={post.id} />
      <CommentPreview postId={post.id} />
    </PostItemWrapper>
  );
};

export default PostItem;
