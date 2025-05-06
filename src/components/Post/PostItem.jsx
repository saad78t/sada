import styled from "styled-components";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostActions from "./PostActions";
import { Link } from "react-router-dom";

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
      <Link
        to={`/post/${post.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <PostContent content={post.content} mediaUrl={post.media_url} />
      </Link>
      <PostActions postId={post.id} />
    </PostItemWrapper>
  );
};

export default PostItem;
