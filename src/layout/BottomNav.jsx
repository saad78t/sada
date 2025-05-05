import styled from "styled-components";

import { NavLink } from "react-router-dom";

const BottomNavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.bgColor};
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 0;
  z-index: 1000;

  @media (min-width: 768px) {
    display: none; // نخفيه في الشاشات الكبيرة
  }
`;

const NavItem = styled(NavLink)`
  color: ${({ theme }) => theme.textColor};
  font-size: 1.5rem;
  text-decoration: none;

  &.active {
    color: ${({ theme }) => theme.buttonHover};
  }

  &:hover {
    color: ${({ theme }) => theme.buttonHover};
  }
`;

const BottomNav = () => {
  return (
    <BottomNavContainer>
      <NavItem to="/" title="Home">
        🏠
      </NavItem>
      <NavItem to="/new" title="New Post">
        ➕
      </NavItem>
      <NavItem to="/profile" title="Profile">
        👤
      </NavItem>
    </BottomNavContainer>
  );
};

export default BottomNav;
