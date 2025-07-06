import { useNavigate, useParams } from "react-router-dom";
import { getComments } from "../../services/commentService";
import { useState } from "react";
import { useAddComment, useDeleteComment } from "../../hooks/useComments";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import UserAvatar from "../Post/UserAvatar";
import CommentOptionsMenu from "../../Comment/CommentOptionsMenu";
import { MessageCircle, ThumbsUp } from "lucide-react";

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

function PostDetailsComments({ post }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutate: deleteCommentMutate } = useDeleteComment();

  const [expandedComments, setExpandedComments] = useState({});

  const addCommentMutation = useAddComment(post?.id);

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
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "absolute",
                zIndex: 999,
                top: "25%",
                right: 0,
              }}
            >
              <CommentOptionsMenu
                onDelete={() => deleteCommentMutate(comment.id)}
              />
            </div>
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
                onSubmit={(content, commentId) =>
                  addCommentMutation.mutate({ content, commentId })
                }
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

  return (
    <div style={{ marginTop: "2rem" }}>
      {loadingComments ? (
        <p>Loading comments...</p>
      ) : (
        comments
          .filter((c) => c.parent_comment_id === null)
          .map((c) => renderComment(c, comments))
      )}
    </div>
  );
}

export default PostDetailsComments;
