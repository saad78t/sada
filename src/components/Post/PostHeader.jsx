import styled from "styled-components";
import UserAvatar from "./UserAvatar";
import { useDeletePost } from "../../hooks/usePost";
import { useToggleMenu } from "../../hooks/useToggleMenu";

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem; /* قللنا المسافة بين الصورة والاسم */
`;

const UserNameDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem; /* المسافة بين الاسم والتاريخ */
  white-space: nowrap;
`;

const UserName = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.textColor};
  font-size: 1rem;
`;

const PostDate = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textColor}99;
`;

const OptionsButton = styled.button`
  background: none;
  border: none;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 140px;
  background-color: ${({ theme }) => theme.bgColor};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  z-index: 10;
`;

const MenuItem = styled.button`
  background: none;
  border: none;
  padding: 0.6rem 1rem;
  width: 100%;
  text-align: left;
  color: ${({ theme }) => theme.textColor};
  font-size: 0.95rem;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.borderColor};
  }
`;

const PostHeader = ({ username, createdAt, avatarUrl, postId }) => {
  const { isDeleting, mutate } = useDeletePost(postId);
  const { showMenu, toggleMenu, menuRef } = useToggleMenu();

  return (
    <HeaderWrapper onClick={(e) => e.stopPropagation()}>
      <UserInfo>
        <UserAvatar username={username} profilePictureUrl={avatarUrl} />
        <UserNameDate>
          <UserName>{username}</UserName>
          <PostDate>{createdAt}</PostDate>
        </UserNameDate>
      </UserInfo>
      <div style={{ position: "relative" }} ref={menuRef}>
        <OptionsButton onClick={toggleMenu}>⋮</OptionsButton>
        {showMenu && (
          <DropdownMenu>
            <MenuItem onClick={() => mutate(postId)} disabled={isDeleting}>
              Delete Post
            </MenuItem>
          </DropdownMenu>
        )}
      </div>
    </HeaderWrapper>
  );
};

export default PostHeader;
