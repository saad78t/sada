import styled from "styled-components";
import { MessageCircle, Heart } from "lucide-react";

const Wrapper = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  cursor: pointer;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Username = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.textColor};
`;

const Time = styled.small`
  color: gray;
  font-size: 0.75rem;
`;

const Content = styled.p`
  margin: 0.5rem 0;
  color: ${({ theme }) => theme.textColor};
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 0.85rem;
  color: gray;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const ActionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const CommentItem = ({ comment, repliesCount = 0, onClick }) => {
  return (
    <Wrapper onClick={() => onClick(comment.id)}>
      <Top>
        <Username>{comment.users?.username || "User"}</Username>
        <Time>{new Date(comment.created_at).toLocaleString()}</Time>
      </Top>
      <Content>{comment.content}</Content>
      <Actions>
        <ActionItem>
          <MessageCircle />
          {repliesCount}
        </ActionItem>
        <ActionItem>
          <Heart />
          {comment.likes_count || 0}
        </ActionItem>
      </Actions>
    </Wrapper>
  );
};

export default CommentItem;
