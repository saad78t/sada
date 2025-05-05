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

const PostContent = () => {
  return (
    <ContentWrapper>
      <PostText>
        هذا هو محتوى البوست، بإمكانك إضافة أي نص هنا يمثل ما كتبه المستخدم.
      </PostText>
      <PostImage src="https://via.placeholder.com/600x400" alt="post" />
    </ContentWrapper>
  );
};

export default PostContent;
