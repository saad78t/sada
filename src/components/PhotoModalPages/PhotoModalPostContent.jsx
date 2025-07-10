import styled from "styled-components";

const PostContent = styled.p`
  direction: ${({ $lang }) => ($lang === "ar" ? "rtl" : "ltr")};
  text-align: start;
  padding-left: 3rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

function PhotoModalPostContent({ post }) {
  const lang = /[\u0600-\u06FF]/.test(post?.content) ? "ar" : "en";

  return <PostContent $lang={lang}>{post.content}</PostContent>;
}

export default PhotoModalPostContent;
