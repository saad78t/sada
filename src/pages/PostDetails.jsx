import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPostById } from "../services/postService";
import { getComments, addComment } from "../services/commentService";
import PostHeader from "../components/Post/PostHeader";
import PostContent from "../components/Post/PostContent";
import PostActions from "../components/Post/PostActions";
import Spinner from "../Shared/Spinner";
import { ArrowLeft, MessageCircle, ThumbsUp } from "lucide-react";
import { useState } from "react";
import UserAvatar from "../components/Post/UserAvatar";
import { timeAgo } from "../utils/helpers";
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

const CommentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  position: relative;
`;

const CommentContent = styled.div`
  flex: 1;
  position: relative;

  /* الخط الأفقي بيبدأ من بداية النص */
  &::after {
    content: "";
    position: absolute;
    bottom: -0.5rem; /* المسافة تحت التعليق */
    left: 0; /* يبدأ من بداية النص */
    right: 0; /* يمتد لنهاية النص */
    height: 1px;
    background: ${({ theme }) => theme.borderColor || "#ddd"};
  }
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

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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

  const addCommentMutation = useMutation({
    mutationFn: ({ content, parentId }) =>
      addComment(post.id, content, parentId),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", id]);
    },
  });

  const handleBack = () => {
    const returnTo = sessionStorage.getItem("returnToPost") || "/";
    navigate(returnTo);
  };

  const handleReplySubmit = (commentId, content) => {
    addCommentMutation.mutate({ content, parentId: commentId });
  };

  const toggleReplies = (commentId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleCommentClick = (commentId) => {
    navigate(`/comment/${commentId}?postId=${post.id}`);
  };

  const renderComment = (comment, allComments, depth = 0) => {
    const replies = allComments.filter(
      (c) => c.parent_comment_id === comment.id
    );
    const showReplies = expandedComments[comment.id];

    return (
      <CommentContainer
        key={comment.id}
        onClick={() =>
          comment.parent_comment_id === null && handleCommentClick(comment.id)
        }
        style={{
          cursor: comment.parent_comment_id === null ? "pointer" : "default",
        }}
      >
        <UserAvatar
          username={comment.users?.username}
          profilePictureUrl={comment.users?.profile_picture_url}
        />
        <CommentContent>
          <AuthorRow>
            <UserName>{comment.users?.username}</UserName>
            <PostDate>
              • {new Date(comment.created_at).toLocaleString()}
            </PostDate>
          </AuthorRow>

          <CommentText content={comment.content}>{comment.content}</CommentText>

          <CommentActions>
            <ActionButton onClick={() => toggleReplies(comment.id)}>
              <MessageCircle size={16} /> {replies.length}
            </ActionButton>
            <ActionButton>
              <ThumbsUp size={16} /> Like
            </ActionButton>
          </CommentActions>

          {showReplies && (
            <>
              {replies.map((reply) =>
                renderComment(reply, allComments, depth + 1)
              )}
              <ReplyForm
                onSubmit={(content) => handleReplySubmit(comment.id, content)}
                onCancel={() =>
                  setExpandedComments((prev) => ({
                    ...prev,
                    [comment.id]: false,
                  }))
                }
              />
            </>
          )}
        </CommentContent>
      </CommentContainer>
    );
  };

  if (isLoading) return <Spinner />;
  if (error || !post) return <p>Post not found</p>;

  return (
    <ContentWrapper>
      <Container>
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

        <PostContent
          content={post.content}
          mediaUrls={post.media_urls}
          postId={post.id}
        />

        <PostActions postId={post.id} />

        <div style={{ marginTop: "2rem" }}>
          <ReplyForm
            onSubmit={(content) => addCommentMutation.mutate({ content })}
            buttonText="Comment"
            placeholder="Write a comment..."
          />
        </div>

        <div style={{ marginTop: "2rem" }}>
          {loadingComments ? (
            <p>Loading comments...</p>
          ) : (
            comments
              .filter((c) => c.parent_comment_id === null)
              .map((c) => renderComment(c, comments))
          )}
        </div>
      </Container>
    </ContentWrapper>
  );
};

export default PostDetails;
