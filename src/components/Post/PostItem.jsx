import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
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

  /* Hover feedback */
  &:hover .clickable-overlay {
    background-color: ${({ theme }) => theme.hoverBg || "rgba(0, 0, 0, 0.03)"};
  }
`;

const ClickableOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  cursor: pointer;
  border-radius: 12px;
  transition: background-color 0.2s ease;
`;

const PostContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  pointer-events: auto;
`;

const PostItem = ({ post }) => {
  const navigate = useNavigate();
  const { content, media_urls, id } = post;
  const location = useLocation();

  const handleNavigate = () => {
    sessionStorage.setItem("scrollY", window.scrollY); // Preserve scroll position
    sessionStorage.setItem("returnToPost", location.pathname); // Store the current page path (Home or PostDetails)
    navigate(`/post/${id}`, {
      state: { from: location.pathname }, //It sends a state containing the page you came (from), so that when you come back you know where you were.
    });
  };

  return (
    <PostItemWrapper>
      <ClickableOverlay
        className="clickable-overlay"
        onClick={handleNavigate}
      />

      <PostContentWrapper>
        <PostHeader
          username={post.users?.username || post.username}
          createdAt={timeAgo(post.created_at)}
          avatarUrl={post.users?.profile_picture_url}
          postId={id}
        />

        <PostContent content={content} mediaUrls={media_urls} postId={id} />

        <PostActions postId={id} />
      </PostContentWrapper>
    </PostItemWrapper>
  );
};

export default PostItem;
