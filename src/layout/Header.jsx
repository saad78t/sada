import styled from "styled-components";

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.headerBg};
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    opacity: 0.7;
  }
`;

const Header = ({ toggleTheme, isDarkMode }) => {
  return (
    <HeaderContainer>
      <Logo>Sada</Logo>
      <RightSection>
        <ToggleButton onClick={toggleTheme}>
          {isDarkMode ? "🌞" : "🌙"}
        </ToggleButton>
        {/* ممكن تضع هنا صورة المستخدم لاحقاً */}
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;
