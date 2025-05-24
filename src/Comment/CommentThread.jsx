import styled from "styled-components";
import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getComments } from "../services/commentService";
import { getPostById } from "../services/postService";
import PostHeader from "../components/Post/PostHeader";
import PostContent from "../components/Post/PostContent";
import Spinner from "../Shared/Spinner";
import UserAvatar from "../components/Post/UserAvatar";
import { timeAgo } from "../utils/helpers";
// import { useEffect } from "react";

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const RepliesWrapper = styled.div`
  margin-left: 3rem; /* move replies right */
`;

const CommentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  position: relative;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.borderColor || "#ddd"};
  }
`;

const CommentContent = styled.div`
  flex: 1;
`;

const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UserName = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.textColor};
`;

const PostDate = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.borderColor};
`;

const CommentText = styled.div`
  margin: 0.25rem 0;
  direction: ${({ content }) =>
    /[\u0600-\u06FF]/.test(content) ? "rtl" : "ltr"};
  text-align: start;
`;

//Vertical line between the post and the main comment
const VerticalLineWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  &::before {
    content: "";
    position: absolute;
    left: 1.25rem; /* Image center (image width 40px) */
    top: 40px; /* Starts from under the post image */
    height: calc(
      100% - 48px - 40px - 1.5rem - 1rem
    ); /* Ends at top of main commenter image */
    width: 2px;
    background: ${({ theme }) => theme.borderColor || "#ccc"};
    z-index: 0;
  }
`;

const CommentThread = () => {
  const { commentId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const postId = queryParams.get("postId");

  //   // Preserve scroll position after closing photo modal
  //   useEffect(() => {
  //     const scrollY = sessionStorage.getItem("scrollY");
  //     if (scrollY) {
  //       window.scrollTo(0, parseInt(scrollY));
  //       sessionStorage.removeItem("scrollY");
  //     }
  //   }, []); // Empty dependency array to run once on mount

  const { data: post, isLoading: loadingPost } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });

  const { data: comments = [], isLoading: loadingComments } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
    enabled: !!postId,
  });

  if (loadingPost || loadingComments) return <Spinner />;

  const mainComment = comments.find((c) => c.id === Number(commentId));
  const replies = comments.filter(
    (c) => c.parent_comment_id === Number(commentId)
  );

  if (!mainComment) return <p>Comment not found.</p>;

  return (
    <Container>
      <VerticalLineWrapper>
        <PostHeader
          username={post.users?.username}
          avatarUrl={post.users?.profile_picture_url}
          createdAt={timeAgo(post.created_at)}
          postId={post.id}
        />
        <PostContent
          content={post.content}
          mediaUrls={post.media_urls}
          postId={post.id}
        />
        <CommentContainer>
          <UserAvatar
            username={mainComment.users?.username}
            profilePictureUrl={mainComment.users?.profile_picture_url}
          />
          <CommentContent>
            <AuthorRow>
              <UserName>{mainComment.users?.username}</UserName>
              <PostDate>
                • {new Date(mainComment.created_at).toLocaleString()}
              </PostDate>
            </AuthorRow>
            <CommentText content={mainComment.content}>
              {mainComment.content}
            </CommentText>
          </CommentContent>
        </CommentContainer>
      </VerticalLineWrapper>

      {replies.length > 0 && (
        <RepliesWrapper>
          {replies.map((reply) => (
            <CommentContainer key={reply.id}>
              <UserAvatar
                username={reply.users?.username}
                profilePictureUrl={reply.users?.profile_picture_url}
              />
              <CommentContent>
                <AuthorRow>
                  <UserName>{reply.users?.username}</UserName>
                  <PostDate>
                    • {new Date(reply.created_at).toLocaleString()}
                  </PostDate>
                </AuthorRow>
                <CommentText content={reply.content}>
                  {reply.content}
                </CommentText>
              </CommentContent>
            </CommentContainer>
          ))}
        </RepliesWrapper>
      )}
    </Container>
  );
};

export default CommentThread;
