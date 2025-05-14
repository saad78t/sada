import React, { useState } from "react";
import styled from "styled-components";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const ContentWrapper = styled.div`
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};
  text-align: start;
  margin-bottom: 0.5rem;
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
        return "grid-template-columns: 1fr 1fr;";
    }
  }}
`;

const MediaItem = styled.div`
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  position: relative;

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
  cursor: pointer;
  border-radius: 8px;
`;

const StyledVideo = styled.video`
  width: 100%;
  max-height: 400px;
  border-radius: 8px;
  margin-top: 0.5rem;
`;

const MoreOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

const PostContent = ({
  content,
  mediaUrls = [],
  disableNavigation = false,
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const lang = /[\u0600-\u06FF]/.test(content) ? "ar" : "en";

  const images = mediaUrls?.filter((url) => !url.endsWith(".mp4")) || [];
  const videos = mediaUrls?.filter((url) => url.endsWith(".mp4")) || [];

  const handleImageClick = (index) => {
    if (disableNavigation) {
      setCurrentIndex(index);
      setLightboxOpen(true);
    }
  };

  return (
    <>
      <ContentWrapper lang={lang}>{content}</ContentWrapper>

      {images.length > 0 && (
        <MediaGrid count={Math.min(images.length, 4)}>
          {images.slice(0, 4).map((url, index) => (
            <MediaItem
              key={index}
              count={images.length}
              index={index}
              onClick={() => handleImageClick(index)}
            >
              <StyledImage src={url} alt={`media-${index}`} />
              {index === 3 && images.length > 4 && (
                <MoreOverlay>+{images.length - 4}</MoreOverlay>
              )}
            </MediaItem>
          ))}
        </MediaGrid>
      )}

      {videos.length > 0 &&
        videos.map((video, index) => (
          <StyledVideo key={index} controls>
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
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
