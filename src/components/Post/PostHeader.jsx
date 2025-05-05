import styled from "styled-components";

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.avatarBg};
  margin-right: 0.75rem;
`;

const UserNameDate = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.textColor};
`;

const PostDate = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.borderColor};
`;

const OptionsButton = styled.button`
  background: none;
  border: none;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
`;

const PostHeader = () => {
  return (
    <HeaderWrapper>
      <UserInfo>
        <Avatar />
        <UserNameDate>
          <UserName>Username</UserName>
          <PostDate>2 hours ago</PostDate>
        </UserNameDate>
      </UserInfo>
      <OptionsButton>⋮</OptionsButton>
    </HeaderWrapper>
  );
};

export default PostHeader;
