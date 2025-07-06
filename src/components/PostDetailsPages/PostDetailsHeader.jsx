import styled from "styled-components";
import PostHeader from "../Post/PostHeader";

import { timeAgo } from "../../utils/helpers";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ArrowButtonWrapper = styled.div`
  position: relative;
`;

const StyledArrowButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #1da1f2; /* لون تويتر */
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 9999px; /* زر دائري */
  cursor: pointer;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1a91da; /* لون أغمق عند التحويل */
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

function PostDetailsHeader({ post }) {
  const navigate = useNavigate();

  const handleBack = () => {
    const returnTo = sessionStorage.getItem("returnToPost") || "/";
    navigate(returnTo);
  };

  return (
    <div>
      <ArrowButtonWrapper>
        <StyledArrowButton onClick={handleBack}>
          <ArrowLeft />
          Back to Posts
        </StyledArrowButton>

        <PostHeader
          username={post.users?.username || post.username}
          avatarUrl={post.users?.profile_picture_url}
          createdAt={timeAgo(post.created_at)}
          postId={post.id}
        />
      </ArrowButtonWrapper>
    </div>
  );
}

export default PostDetailsHeader;
