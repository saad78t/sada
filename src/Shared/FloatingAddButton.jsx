import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Plus } from "lucide-react";

const AddButton = styled.button`
  position: fixed;
  bottom: 80px;
  right: 20px;
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 1000;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }

  @media (min-width: 768px) {
    bottom: 30px;
    right: 30px;
  }
`;

const FloatingAddButton = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (pathname === "/new") return null; // إخفاء الزر في صفحة الإضافة

  return (
    <AddButton onClick={() => navigate("/new")}>
      <Plus />
    </AddButton>
  );
};

export default FloatingAddButton;
