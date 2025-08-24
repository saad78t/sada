import styled from "styled-components";
import { getSizeByDepth } from "../../utils/helpers";

const AvatarImage = styled.img`
  width: ${({ $depth }) => getSizeByDepth($depth, "avatar")};
  height: ${({ $depth }) => getSizeByDepth($depth, "avatar")};
  border-radius: 50%;
  object-fit: cover;
  margin-right: 0.5rem;
  flex-shrink: 0;
`;

const AvatarCircle = styled.div`
  width: ${({ $depth }) => getSizeByDepth($depth, "avatar")};
  height: ${({ $depth }) => getSizeByDepth($depth, "avatar")};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.avatarBg || "#ccc"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: ${({ $depth }) => ($depth === 0 ? "1rem" : "0.85rem")};
  margin-right: 0.5rem;
  flex-shrink: 0;
`;

const UserAvatar = ({ username, profilePictureUrl, depth = 0 }) => {
  const firstLetter = username?.charAt(0).toUpperCase() || "?";
  if (profilePictureUrl) {
    return (
      <AvatarImage
        src={profilePictureUrl}
        $depth={depth}
        alt={`${username}'s avatar`}
      />
    );
  }
  return <AvatarCircle $depth={depth}>{firstLetter}</AvatarCircle>;
};

export default UserAvatar;
