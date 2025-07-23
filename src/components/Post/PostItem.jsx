import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import PostHeader from "./PostHeader";
import PostContent from "../Post/PostContent";
import PostActions from "./PostActions";
import { timeAgo } from "../../utils/helpers";

const PostItemWrapper = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  cursor: pointer; /* مؤشر بصري للنقر */

  /* Hover feedback */
  &:hover {
    background-color: ${({ theme }) => theme.hoverBg || "rgba(0, 0, 0, 0.03)"};
  }
`;

const PostContentWrapper = styled.div`
  position: relative;
`;

const PostItem = ({ post, likesMap, likesLoading }) => {
  const navigate = useNavigate();
  const { content, media_urls, id } = post;
  const location = useLocation();

  const handleNavigate = () => {
    sessionStorage.setItem("scrollY", window.scrollY);
    sessionStorage.setItem("returnToPost", location.pathname);
    navigate(`/post/${id}`, {
      state: { from: location.pathname },
    });
  };

  return (
    <PostItemWrapper onClick={handleNavigate}>
      <PostContentWrapper>
        <PostHeader
          username={post.users?.username || post.username}
          createdAt={timeAgo(post.created_at)}
          avatarUrl={post.users?.profile_picture_url}
          postId={id}
        />

        <PostContent content={content} mediaUrls={media_urls} postId={id} />

        <PostActions
          postId={id}
          likesMap={likesMap}
          likesLoading={likesLoading}
        />
      </PostContentWrapper>
    </PostItemWrapper>
  );
};

export default PostItem;
