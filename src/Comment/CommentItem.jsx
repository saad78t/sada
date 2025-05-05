import styled from "styled-components";

const CommentWrapper = styled.div`
  padding: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

const Author = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.textColor};
`;

const Content = styled.p`
  color: ${({ theme }) => theme.textColor};
  margin: 0.3rem 0;
`;

const Timestamp = styled.small`
  color: gray;
  font-size: 0.75rem;
`;

const CommentItem = () => {
  return (
    <CommentWrapper>
      <Author>Ali</Author>
      <Content>هذا تعليق بسيط على المنشور 👍</Content>
      <Timestamp>قبل 5 دقائق</Timestamp>
    </CommentWrapper>
  );
};

export default CommentItem;
