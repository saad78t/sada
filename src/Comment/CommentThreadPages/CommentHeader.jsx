import styled from "styled-components";
import { timeAgo } from "../../utils/helpers";

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

function CommentHeader({ comment }) {
  return (
    <div>
      <AuthorRow>
        <UserName>{comment.users?.username}</UserName>
        <PostDate>• {timeAgo(comment.created_at)}</PostDate>
      </AuthorRow>
    </div>
  );
}

export default CommentHeader;
