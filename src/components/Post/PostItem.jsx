import styled from "styled-components";

const PostItemWrapper = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const Username = styled.h4`
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Content = styled.p`
  line-height: 1.5;
`;

const PostItem = ({ post }) => {
  return (
    <PostItemWrapper>
      <Username>@{post.username}</Username>
      <Content>{post.content}</Content>
    </PostItemWrapper>
  );
};

export default PostItem;
