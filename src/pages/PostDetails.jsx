import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPostById } from "../services/postService";
import { getComments, addComment } from "../services/commentService";
import PostHeader from "../components/Post/PostHeader";
import PostContent from "../components/Post/PostContent";
import PostActions from "../components/Post/PostActions";
import Spinner from "../Shared/Spinner";
import { ArrowLeft } from "lucide-react";
import { timeAgo } from "../utils/helpers";

import CommentItem from "../Comment/CommentItem";
import ReplyForm from "../Comment/ReplyForm";

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const ContentWrapper = styled.div`
  max-width: 550px;
  margin: 0 auto;
`;

const ArrowButtonWrapper = styled.div`
  position: relative;
`;

const StyledArrowButton = styled.button`
  position: absolute;
  top: -40px;
  left: -10px;
  background: white;
  border: none;
  border-radius: 50%;
  padding: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 10;
`;

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
    enabled: !!id,
  });

  const { data: comments = [], isLoading: loadingComments } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getComments(id),
  });

  const addReplyMutation = useMutation({
    mutationFn: ({ content, parentId }) =>
      addComment(post.id, content, parentId),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", id]);
    },
  });

  const handleAddReply = (content, parentId) => {
    addReplyMutation.mutate({ content, parentId });
  };

  const handleBack = () => {
    const returnTo = sessionStorage.getItem("returnToPost") || "/";
    navigate(returnTo);
  };

  if (isLoading) return <Spinner />;
  if (error || !post) return <p>Post not found</p>;

  return (
    <ContentWrapper>
      <Container>
        <ArrowButtonWrapper>
          <StyledArrowButton onClick={handleBack}>
            <ArrowLeft />
          </StyledArrowButton>

          <PostHeader
            username={post.users?.username || post.username}
            avatarUrl={post.users?.profile_picture_url}
            createdAt={timeAgo(post.created_at)}
            postId={post.id}
          />
        </ArrowButtonWrapper>

        <PostContent
          content={post.content}
          mediaUrls={post.media_urls}
          postId={post.id}
        />

        <PostActions postId={post.id} />

        <div style={{ marginTop: "2rem" }}>
          {loadingComments ? (
            <p>Loading comments...</p>
          ) : (
            comments
              .filter((c) => c.parent_comment_id === null)
              .map((comment) => (
                <div key={comment.id}>
                  <CommentItem comment={comment} comments={comments} />
                  <ReplyForm parentId={comment.id} onSubmit={handleAddReply} />
                </div>
              ))
          )}
        </div>
      </Container>
    </ContentWrapper>
  );
};

export default PostDetails;
