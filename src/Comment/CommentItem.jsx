import styled from "styled-components";
import { ThumbsUp, MessageCircle } from "lucide-react";
import { useState } from "react";
import UserAvatar from "../components/Post/UserAvatar";
import ReplyForm from "./ReplyForm";
import { timeAgo } from "../utils/helpers";

const CommentContainer = styled.div`
  padding-left: ${({ $depth }) => $depth * 16}px;
  margin-bottom: 1rem;
  border-left: ${({ $depth }) => ($depth > 0 ? "2px solid #eee" : "none")};
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserName = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.textColor};
`;

const CommentDate = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.borderColor};
`;

const CommentText = styled.p`
  margin: 4px 0 6px 0;
  line-height: 1.3;
`;

const CommentActions = styled.div`
  display: flex;
  gap: 12px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textColor};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.textColor};

  &:hover {
    text-decoration: underline;
  }
`;

const CommentItem = ({ comment, comments, depth = 0, onReplySubmit }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replying, setReplying] = useState(false);

  const replies = comments?.filter((c) => c.parent_comment_id === comment.id);

  const handleReply = (content) => {
    onReplySubmit(content, comment.id);
    setReplying(false);
  };

  return (
    <CommentContainer $depth={depth}>
      <CommentHeader>
        <UserAvatar
          username={comment.users?.username}
          profilePictureUrl={comment.users?.profile_picture_url}
        />
        <div>
          <UserName>{comment.users?.username}</UserName>{" "}
          <CommentDate>· {timeAgo(comment.created_at)}</CommentDate>
        </div>
      </CommentHeader>

      <CommentText>{comment.content}</CommentText>

      <CommentActions>
        <ActionButton>
          <ThumbsUp size={16} /> Like
        </ActionButton>

        {replies?.length > 0 && (
          <ActionButton onClick={() => setShowReplies(!showReplies)}>
            <MessageCircle size={16} />
            {showReplies ? "Hide replies" : `View replies (${replies.length})`}
          </ActionButton>
        )}

        <ActionButton onClick={() => setReplying(!replying)}>
          Reply
        </ActionButton>
      </CommentActions>

      {replying && (
        <ReplyForm onSubmit={handleReply} onCancel={() => setReplying(false)} />
      )}

      {showReplies &&
        replies.map((reply) => (
          <CommentItem
            key={reply.id}
            comment={reply}
            comments={comments}
            depth={depth + 1}
            onReplySubmit={onReplySubmit}
          />
        ))}
    </CommentContainer>
  );
};

export default CommentItem;
