// Avatar.jsx
import styled from "styled-components";

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.borderColor || "#e2e8f0"};
  background-color: ${({ theme }) => theme.avatarBg || "#cbd5e1"};
`;
