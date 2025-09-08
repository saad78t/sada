import React from "react";
import PostContent from "../Post/PostContent";
import PostDetailsMedia from "./PostDetailsMedia";
import styled from "styled-components";

const Title = styled.p`
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};
  text-align: start;
  padding-left: 3rem;
  padding-right: 1rem;
  font-weight: 600;
`;

function PostDetailsContent({ post }) {
  const lang = /[\u0600-\u06FF]/.test(post.content) ? "ar" : "en";

  return (
    <div>
      <Title lang={lang}>{post.title}</Title>
      <PostContent content={post.content} />
      <PostDetailsMedia mediaUrls={post.media_urls} />
    </div>
  );
}

export default React.memo(PostDetailsContent); //To prevent the video from restarting from the beginning when adding a comment, as when adding a comment a component rendering problem occurred.
