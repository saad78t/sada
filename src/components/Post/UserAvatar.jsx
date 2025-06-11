// import styled from "styled-components";

// const AvatarCircle = styled.div`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background-color: ${({ theme }) => theme.avatarBg || "#ccc"};
//   color: white;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-weight: bold;
//   font-size: 1.2rem;
//   margin-right: 0.75rem;
// `;

// const AvatarImage = styled.img`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   object-fit: cover;
//   margin-right: 0.75rem;
// `;

// const UserAvatar = ({ username, profilePictureUrl }) => {
//   const firstLetter = username?.charAt(0).toUpperCase() || "?";

//   if (profilePictureUrl) {
//     return <AvatarImage src={profilePictureUrl} alt={`${username}'s avatar`} />;
//   }

//   return <AvatarCircle>{firstLetter}</AvatarCircle>;
// };

// export default UserAvatar;

import styled from "styled-components";

const AvatarCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.avatarBg || "#ccc"};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: 0.75rem;
`;

const AvatarImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 0.75rem;
`;

const UserAvatar = ({ username, profilePictureUrl }) => {
  const firstLetter = username?.charAt(0).toUpperCase() || "?";

  if (profilePictureUrl) {
    return <AvatarImage src={profilePictureUrl} alt={`${username}'s avatar`} />;
  }

  return <AvatarCircle>{firstLetter}</AvatarCircle>;
};

export default UserAvatar;
