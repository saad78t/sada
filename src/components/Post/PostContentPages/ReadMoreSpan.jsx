import styled from "styled-components";

const ReadMoreSpan = styled.span`
  color: ${({ theme }) => theme.readMoreColor || "#1da1f2"};
  cursor: pointer;
  font-weight: 500;
  margin-left: 4px;
  white-space: nowrap;
  &:hover {
    text-decoration: underline;
  }
`;

export default ReadMoreSpan;
