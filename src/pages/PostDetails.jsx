import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../services/postService";
import { getComments } from "../services/commentService";
import PostHeader from "../components/Post/PostHeader";
import PostContent from "../components/Post/PostContent";
import PostActions from "../components/Post/PostActions";
import Spinner from "../Shared/Spinner";
import { ArrowLeft, ThumbsUp, MessageCircle } from "lucide-react";
import { useState } from "react";

const PostDetailsContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 1rem;
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

const CommentBlock = styled.div`
  border-left: ${({ hasLine }) => (hasLine ? "2px solid #28a745" : "none")};
  padding-left: ${({ hasLine }) => (hasLine ? "1rem" : "0")};
  margin-top: 1rem;
`;

const CommentContent = styled.div`
  margin-bottom: 0.5rem;
  cursor: pointer;
`;

const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// const Avatar = styled.img`
//   width: 32px;
//   height: 32px;
//   border-radius: 50%;
// `;

const Author = styled.div`
  font-weight: bold;
`;

const Timestamp = styled.small`
  color: gray;
  margin-left: 8px;
`;

const CommentText = styled.div`
  margin: 0.3rem 0;
`;

const CommentActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 0.5rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: ${({ theme }) => theme.textColor};
  font-size: 0.85rem;
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #6c757d;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  margin-right: 0.5rem;
`;

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expandedComments, setExpandedComments] = useState({});

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

  const toggleReplies = (commentId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const renderComment = (comment, allComments, depth = 0) => {
    const replies = allComments.filter(
      (c) => c.parent_comment_id === comment.id
    );
    const showReplies = expandedComments[comment.id];

    return (
      <CommentBlock key={comment.id} hasLine={depth === 0}>
        <CommentContent
          onClick={() => replies.length > 0 && toggleReplies(comment.id)}
        >
          <AuthorRow>
            {comment.users?.avatar_url && (
              <Avatar src={comment.users.avatar_url} alt="avatar" />
            )}
            <Author>
              {comment.users?.username || "User"}
              <Timestamp>
                {new Date(comment.created_at).toLocaleString()}
              </Timestamp>
            </Author>
          </AuthorRow>
          <CommentText>{comment.content}</CommentText>
          <CommentActions>
            <ActionButton>
              <ThumbsUp size={16} /> Like
            </ActionButton>
            {replies.length > 0 && (
              <ActionButton>
                <MessageCircle size={16} /> {replies.length}
              </ActionButton>
            )}
          </CommentActions>
        </CommentContent>
        {showReplies &&
          replies.map((reply) => renderComment(reply, allComments, depth + 1))}
      </CommentBlock>
    );
  };

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
      <PostHeader
        username={post.users?.username || post.username}
        avatarUrl={post.users?.avatar_url}
        createdAt={post.created_at}
      />
      <PostContent content={post.content} mediaUrl={post.media_url} />
      <PostActions postId={post.id} />

      <div style={{ marginTop: "2rem" }}>
        {loadingComments ? (
          <p>Loading comments...</p>
        ) : (
          comments
            .filter((comment) => comment.parent_comment_id === null)
            .map((comment) => renderComment(comment, comments))
        )}
      </div>
    </PostDetailsContainer>
  );
};

export default PostDetails;
