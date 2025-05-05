import styled from "styled-components";
import Header from "./Header";
import BottomNav from "./BottomNav";
import { Outlet } from "react-router-dom";
import FloatingAddButton from "../Shared/FloatingAddButton";

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
`;

const MainContent = styled.main`
  flex: 1;
  padding-bottom: 60px; // نترك مساحة للـ BottomNav في الموبايل
`;

const Layout = ({ toggleTheme, isDarkMode }) => {
  return (
    <LayoutContainer>
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <MainContent>
        <Outlet />
      </MainContent>
      <BottomNav />
      <FloatingAddButton />
    </LayoutContainer>
  );
};

export default Layout;
