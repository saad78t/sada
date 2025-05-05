import styled from "styled-components";

const ContentWrapper = styled.div`
  margin-bottom: 1rem;
`;

const PostText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 0.75rem;
`;

const PostImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover; //Makes the image look good no matter the size.
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.borderColor};
`;

const PostContent = ({ content, mediaUrl }) => {
  return (
    <ContentWrapper>
      <PostText>{content}</PostText>
      <PostImage src={mediaUrl} alt="post" />
    </ContentWrapper>
  );
};

export default PostContent;
