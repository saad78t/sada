import styled from "styled-components";

const PostContent = styled.p`
  direction: ${({ $lang }) => ($lang === "ar" ? "rtl" : "ltr")};
  text-align: start;
  padding-left: 3rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

const Title = styled.p`
  text-align: start;
  padding-left: 3rem;
  font-weight: 600;
`;

function PhotoModalPostContent({ post }) {
  const lang = /[\u0600-\u06FF]/.test(post?.content) ? "ar" : "en";

  return (
    <>
      <Title>{post.title}</Title>
      <PostContent $lang={lang}>{post.content}</PostContent>
    </>
  );
}

export default PhotoModalPostContent;
