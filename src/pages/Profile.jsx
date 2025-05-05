import styled from "styled-components";

const ProfileContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 1rem;

  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.avatarBg};

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Username = styled.h2`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.5rem;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const Bio = styled.p`
  color: ${({ theme }) => theme.textColor};
  font-size: 0.95rem;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const PostsSection = styled.div`
  margin-top: 2rem;
`;

const Profile = () => {
  return (
    <ProfileContainer>
      <ProfileHeader>
        <Avatar />
        <UserInfo>
          <Username>John Doe</Username>
          <Bio>This is a short bio about the user.</Bio>
        </UserInfo>
      </ProfileHeader>

      <PostsSection>{/* منشورات المستخدم */}</PostsSection>
    </ProfileContainer>
  );
};

export default Profile;
