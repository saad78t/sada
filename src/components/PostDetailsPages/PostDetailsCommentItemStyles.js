import styled from "styled-components";

export const CommentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  position: relative;
`;

export const CommentContent = styled.div`
  flex: 1;
  position: relative;

  /* الخط الأفقي بيبدأ من بداية النص */
  &::after {
    content: "";
    position: absolute;
    bottom: -0.5rem; /* المسافة تحت التعليق */
    left: ${({ $isDeleted }) =>
      $isDeleted ? "10px" : "0"}; /* يبدأ من بداية النص */
    right: 0; /* يمتد لنهاية النص */
    height: 1px;
    background: ${({ theme }) => theme.borderColor || "#ddd"};
  }
`;

export const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const UserName = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.textColor};
`;

export const PostDate = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.borderColor};
`;

export const CommentText = styled.div`
  margin: 0.25rem 0;
  direction: ${({ content }) =>
    /[\u0600-\u06FF]/.test(content) ? "rtl" : "ltr"};
  text-align: start;
`;

export const CommentActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 0.5rem;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: ${({ theme }) => theme.textColor};
  font-size: 0.85rem;
`;
