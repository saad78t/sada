import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../services/postService";
import PostHeader from "../components/Post/PostHeader";
import PostContent from "../components/Post/PostContent";
import PostActions from "../components/Post/PostActions";
import { getComments } from "../services/commentService";
import { ArrowLeft } from "lucide-react";
import Spinner from "../Shared/Spinner";
import CommentItem from "../Comment/CommentItem";

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

const SecondaryHeader = styled.div`
  position: fixed;
  top: 95px;
  width: 100%;
  max-width: 700px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  background: rgba(94, 94, 94, 0.8);
  display: flex;
  align-items: center;
  padding: 10px;
`;
const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 5px;
  color: white;
`;
const Text = styled.span`
  color: white;
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

  if (isLoading) return <Spinner />;
  if (error || !post) return <p>Post not found</p>;

  return (
    <PostDetailsContainer>
      {location.pathname === `/post/${id}` && (
        <SecondaryHeader>
          <ArrowButton onClick={() => navigate(-1)}>
            <ArrowLeft />
          </ArrowButton>
          <Text>Post</Text>
        </SecondaryHeader>
      )}
      <PostWrapper>
        <PostHeader
          username={post.users?.username || post.username}
          createdAt={post.created_at}
        />
        <PostContent content={post.content} mediaUrl={post.media_url} />
        <PostActions postId={post.id} />
      </PostWrapper>

      <CommentsSection>
        <CommentForm>
          <CommentInput placeholder="Write a comment..." />
          <SubmitCommentButton>Comment</SubmitCommentButton>
        </CommentForm>
        {comments
          .filter((comment) => comment.parent_comment_id === null)
          .map((comment) => {
            const repliesCount = comments.filter(
              (reply) => reply.parent_comment_id === comment.id
            ).length;

            return (
              <CommentItem
                key={comment.id}
                comment={comment}
                repliesCount={repliesCount}
                onClick={(commentId) => {
                  // هنا تدخل على صفحة أو نافذة الردود حسب ما تريد
                  console.log("عرض الردود للتعليق:", commentId);
                }}
              />
            );
          })}
      </CommentsSection>
    </PostDetailsContainer>
  );
};

export default PostDetails;
