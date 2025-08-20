import styled from "styled-components";
import { getSizeByDepth, timeAgo } from "../../utils/helpers";

const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UserName = styled.span`
  font-weight: bold;
  font-size: ${({ $depth }) => getSizeByDepth($depth, "username")};
  color: ${({ theme }) => theme.textColor};
`;

const PostDate = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.borderColor};
`;

function CommentHeader({ comment, depth }) {
  return (
    <div>
      <AuthorRow>
        <UserName $depth={depth}>{comment.users?.username}</UserName>
        <PostDate>• {timeAgo(comment.created_at)}</PostDate>
      </AuthorRow>
    </div>
  );
}

export default CommentHeader;
