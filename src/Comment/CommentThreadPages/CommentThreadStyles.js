import styled from "styled-components";

export const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const RepliesWrapper = styled.div`
  margin-left: 0.1rem;
  margin-top: 1.5rem;
`;

export const CommentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  position: relative;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.borderColor || "#ddd"};
  }
`;

export const CommentContent = styled.div`
  flex: 1;
`;

export const FixedReplyFormWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 700px;
  padding: 0.75rem 0.5rem;
  background: #f9f9f9;
  border-top: 1px solid #ddd;
  z-index: 9999;
`;
