import styled from "styled-components";
import { useToggleMenu } from "../hooks/useToggleMenu";

const OptionsButton = styled.button`
  position: absolute;
  right: 0;
  top: ${({ $optionTop }) => $optionTop || 0};

  background: none;
  border: none;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: ${({ $top }) => $top || "25%"};
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

function CommentOptionsMenu({ onDelete, top, optionTop }) {
  const { showMenu, toggleMenu, menuRef } = useToggleMenu();

  return (
    <div ref={menuRef}>
      <OptionsButton $optionTop={optionTop} onClick={toggleMenu}>
        ⋮
      </OptionsButton>
      {showMenu && (
        <DropdownMenu $top={top}>
          <MenuItem onClick={onDelete}>Delete</MenuItem>
        </DropdownMenu>
      )}
    </div>
  );
}

export default CommentOptionsMenu;
