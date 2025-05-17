import styled from "styled-components";

export const ReadMoreButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  margin-left: 6px;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;
