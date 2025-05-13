import React from "react";
import styled from "styled-components";

const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: cover;
  border-radius: 10px;
`;

const StyledVideo = styled.video`
  width: 100%;
  max-height: 300px;
  border-radius: 10px;
  object-fit: cover;
`;

const PostContent = ({ content, mediaUrls }) => {
  return (
    <div>
      <p>{content}</p>

      <MediaGrid>
        {mediaUrls?.map((url, index) => {
          const isVideo = url.toLowerCase().includes(".mp4");

          return isVideo ? (
            <StyledVideo key={index} controls>
              <source src={url} type="video/mp4" />
              متصفحك لا يدعم تشغيل الفيديو.
            </StyledVideo>
          ) : (
            <StyledImage key={index} src={url} alt={`media-${index}`} />
          );
        })}
      </MediaGrid>
    </div>
  );
};

export default PostContent;
