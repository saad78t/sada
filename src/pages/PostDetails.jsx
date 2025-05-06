import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../services/postService";
import PostItem from "../components/Post/PostItem";
import PostHeader from "../components/Post/PostHeader";
import PostContent from "../components/Post/PostContent";
import PostActions from "../components/Post/PostActions";
import { getComments } from "../services/commentService";
import { ArrowLeft } from "lucide-react";

const PostDetailsContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 1rem;

  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const PostWrapper = styled.div`
  margin-bottom: 2rem;
`;

const CommentsSection = styled.div`
  margin-top: 2rem;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const CommentInput = styled.textarea`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  resize: vertical;
  min-height: 100px;

  @media (max-width: 480px) {
    min-height: 80px;
  }
`;

const SubmitCommentButton = styled.button`
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 0.5rem 0.75rem;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  font-size: 1.5rem;

  &:hover {
    opacity: 0.8;
  }
`;

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
    enabled: !!id, // حتى ما يشتغل قبل ما يجي id
  });

  const { data: comments = [], isLoading: loadingComments } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getComments(id),
  });

  if (isLoading) return <p>Loading post...</p>;
  if (error || !post) return <p>Post not found</p>;

  return (
    <PostDetailsContainer>
      <p>Post</p>
      <BackButton onClick={() => navigate("/")}>
        <ArrowLeft />
      </BackButton>

      <PostWrapper>
        <PostHeader
          username={post.users?.username || post.username}
          createdAt={post.created_at}
        />
        <PostContent content={post.content} mediaUrl={post.media_url} />
        <PostActions postId={post.id} />
      </PostWrapper>

      <CommentsSection>
        {/* هنا قائمة التعليقات */}
        <CommentForm>
          <CommentInput placeholder="Write a comment..." />
          <SubmitCommentButton>Comment</SubmitCommentButton>
        </CommentForm>
        {loadingComments ? (
          <p>Loading comments...</p>
        ) : (
          comments
            .filter((comment) => comment.parent_comment_id === null)
            .map((comment) => (
              <div key={comment.id} style={{ marginBottom: "1.5rem" }}>
                <strong>{comment.users?.username || "User"}:</strong>{" "}
                {comment.content}
                {/* عرض الردود على هذا التعليق */}
                <div style={{ marginLeft: "1.5rem", marginTop: "0.5rem" }}>
                  {comments
                    .filter((reply) => reply.parent_comment_id === comment.id)
                    .map((reply) => (
                      <div key={reply.id} style={{ marginBottom: "0.5rem" }}>
                        <strong>{reply.users?.username || "User"}:</strong>{" "}
                        {reply.content}
                      </div>
                    ))}
                </div>
              </div>
            ))
        )}
      </CommentsSection>
    </PostDetailsContainer>
  );
};

export default PostDetails;
