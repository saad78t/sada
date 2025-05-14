import React, { useState } from "react";
import styled from "styled-components";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const ContentWrapper = styled.div`
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};
  text-align: start;
  margin-bottom: 1rem;
`;

const MediaGrid = styled.div`
  display: grid;
  gap: 4px;
  ${({ count }) => {
    switch (count) {
      case 1:
        return "grid-template-columns: 1fr;";
      case 2:
        return "grid-template-columns: 1fr 1fr;";
      case 3:
        return `
          grid-template-columns: 2fr 1fr;
          grid-template-rows: 1fr 1fr;
          grid-template-areas: 
            'main side1'
            'main side2';
        `;
      case 4:
        return `
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
        `;
      default:
        return "grid-template-columns: 1fr;";
    }
  }}
`;

const MediaItem = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  ${({ count }) => count === 4 && "aspect-ratio: 4 / 3;"}
  ${({ count }) => count !== 4 && "aspect-ratio: 1;"}

  ${({ count, index }) => {
    if (count === 3) {
      if (index === 0) return "grid-area: main;";
      if (index === 1) return "grid-area: side1;";
      if (index === 2) return "grid-area: side2;";
    }
    return "";
  }}
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const StyledVideo = styled.video`
  width: 100%;
  max-height: 400px;
  border-radius: 8px;
  margin-top: 0.5rem;
`;

const PostContent = ({ content, mediaUrls = [] }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const lang = /[\u0600-\u06FF]/.test(content) ? "ar" : "en";

  const images = Array.isArray(mediaUrls)
    ? mediaUrls.filter((url) => !url.endsWith(".mp4"))
    : [];

  const videos = Array.isArray(mediaUrls)
    ? mediaUrls.filter((url) => url.endsWith(".mp4"))
    : [];

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <ContentWrapper lang={lang}>{content}</ContentWrapper>

      {images.length > 0 && (
        <MediaGrid count={images.length}>
          {images.map((url, index) => (
            <MediaItem
              key={index}
              count={images.length}
              index={index}
              onClick={() => handleImageClick(index)}
            >
              <StyledImage src={url} alt={`media-${index}`} />
            </MediaItem>
          ))}
        </MediaGrid>
      )}

      {videos.length > 0 &&
        videos.map((video, index) => (
          <StyledVideo key={index} controls>
            <source src={video} type="video/mp4" />
            المتصفح لا يدعم تشغيل الفيديو.
          </StyledVideo>
        ))}

      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={currentIndex}
          slides={images.map((src) => ({ src }))}
        />
      )}
    </>
  );
};

export default PostContent;
