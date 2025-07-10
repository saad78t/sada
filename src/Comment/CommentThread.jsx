import styled from "styled-components";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getComments, addComment } from "../services/commentService";
import PostHeader from "../components/Post/PostHeader";
import PostContent from "../components/Post/PostContent";
import Spinner from "../Shared/Spinner";
import UserAvatar from "../components/Post/UserAvatar";
import { timeAgo } from "../utils/helpers";
import { MessageCircle, ThumbsUp, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { usePost } from "../hooks/usePost";

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const BackButton = styled.button`
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

const RepliesWrapper = styled.div`
  margin-left: 3rem;
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
  cursor: pointer;
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

const VerticalLineWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  &::before {
    content: "";
    position: absolute;
    left: 1.25rem;
    top: 40px;
    height: calc(100% - 48px - 40px - 1.5rem - 1rem);
    width: 2px;
    background: ${({ theme }) => theme.borderColor || "#ccc"};
    z-index: 0;
  }
`;

const InlineForm = styled.form`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  gap: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.4rem 0.6rem;
  font-size: 0.85rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  padding: 0.3rem 0.8rem;
  font-size: 0.85rem;
  background: ${({ theme }) => theme.textColor};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CommentThread = () => {
  const { commentId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const postId = queryParams.get("postId");
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [openReplies, setOpenReplies] = useState({});

  const { post, isLoading } = usePost(postId);

  const { data: comments = [], isLoading: loadingComments } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
    enabled: !!postId,
  });

  const addCommentMutation = useMutation({
    mutationFn: ({ content, parentId }) =>
      addComment(postId, content, parentId),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId]);
      setReplyingTo(null);
      setReplyContent("");
    },
  });

  if (isLoading || loadingComments) return <Spinner />;

  const mainComment = comments.find((c) => c.id === Number(commentId));
  const replies = comments.filter(
    (c) => c.parent_comment_id === Number(commentId)
  );

  if (!mainComment) return <p>Comment not found.</p>;

  const handleReplySubmit = (e, parentId) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    addCommentMutation.mutate({ content: replyContent, parentId });
  };

  const renderComment = (comment) => {
    const nestedReplies = comments.filter(
      (c) => c.parent_comment_id === comment.id
    );
    const showReplies = openReplies[comment.id];

    const isMainComment = comment.id === Number(commentId);

    return (
      <CommentContainer key={comment.id}>
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
          <CommentText
            content={comment.content}
            onClick={() => setReplyingTo(comment.id)}
          >
            {comment.content}
          </CommentText>
          <CommentActions>
            <ActionButton
              onClick={isMainComment ? null : () => toggleReplies(comment.id)}
            >
              <MessageCircle size={16} />
              {nestedReplies.length > 0 && <span>{nestedReplies.length}</span>}
            </ActionButton>
            <ActionButton>
              <ThumbsUp size={16} />
            </ActionButton>
          </CommentActions>

          {replyingTo === comment.id && (
            <InlineForm onSubmit={(e) => handleReplySubmit(e, comment.id)}>
              <Input
                type="text"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
              />
              <SubmitButton type="submit">Reply</SubmitButton>
            </InlineForm>
          )}

          {showReplies && (
            <RepliesWrapper>
              {nestedReplies.map((reply) => renderComment(reply))}
            </RepliesWrapper>
          )}
        </CommentContent>
      </CommentContainer>
    );
  };

  const toggleReplies = (commentId) => {
    setOpenReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
    setReplyingTo(null);
  };

  const handleBackClick = () => {
    navigate(`/post/${postId}`); // العودة لصفحة PostDetails
  };

  return (
    <Container>
      <BackButton onClick={handleBackClick}>
        <ArrowLeft />
        Back to Post
      </BackButton>
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
        {renderComment(mainComment)}
      </VerticalLineWrapper>

      {replies.length > 0 && (
        <RepliesWrapper>
          {replies.map((reply) => renderComment(reply))}
        </RepliesWrapper>
      )}
    </Container>
  );
};

export default CommentThread;
