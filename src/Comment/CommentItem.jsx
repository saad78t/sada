import { useState } from "react";
import styled from "styled-components";
import { MessageCircle, ThumbsUp } from "lucide-react";

const Wrapper = styled.div`
  border-left: 2px solid #ccc;
  margin-left: ${(props) => (props.level > 0 ? "20px" : "0")};
  padding-left: 10px;
  margin-top: 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Username = styled.span`
  font-weight: bold;
`;

const Timestamp = styled.small`
  color: gray;
`;

const Content = styled.p`
  margin: 0.5rem 0;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
  color: #555;
  cursor: pointer;
`;

const CommentItem = ({ comment, comments, level = 0 }) => {
  const [showReplies, setShowReplies] = useState(false);

  const replies = comments?.filter((c) => c.parent_comment_id === comment.id);

  return (
    <Wrapper level={level}>
      <Header>
        <img
          src={comment.users?.avatar_url || "/default-avatar.png"}
          alt="avatar"
          style={{ width: 30, height: 30, borderRadius: "50%" }}
        />
        <Username>{comment.users?.username || "User"}</Username>
        <Timestamp>{new Date(comment.created_at).toLocaleString()}</Timestamp>
      </Header>
      <Content>{comment.content}</Content>
      <Actions>
        <span onClick={() => setShowReplies((prev) => !prev)}>
          <MessageCircle size={16} /> {replies?.length}
        </span>
        <span>
          <ThumbsUp size={16} /> Like
        </span>
      </Actions>

      {showReplies &&
        replies?.map((reply) => (
          <CommentItem
            key={reply.id}
            comment={reply}
            comments={comments}
            level={level + 1}
          />
        ))}
    </Wrapper>
  );
};

export default CommentItem;
