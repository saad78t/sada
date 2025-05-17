import { useState } from "react";
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
    if (count === 1) {
      return `grid-template-columns: 1fr;`;
    } else if (count === 2) {
      return `grid-template-columns: 1fr 1fr;`;
    } else if (count === 3) {
      return `
        grid-template-columns: 2fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-template-areas:
          'main side1'
          'main side2';
      `;
    } else {
      // يشمل 4 أو أكثر
      return `
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        max-height: 360px;
      `;
    }
  }}
`;

const MediaItem = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 8px;

  ${({ count, index }) => {
    if (count === 3) {
      if (index === 0) return "grid-area: main;";
      if (index === 1) return "grid-area: side1;";
      if (index === 2) return "grid-area: side2;";
    }
    return "";
  }}

  ${({ count }) => {
    if (count === 1) {
      return `max-height: 400px;`;
    } else if (count >= 4) {
      return `
        aspect-ratio: 1 / 1;
        height: 150px;
      `;
    } else {
      return `
        aspect-ratio: 1 / 1;
      `;
    }
  }}
`;

const ReadMoreSpan = styled.span`
  color: ${({ theme }) => theme.readMoreColor || "#1da1f2"};
  cursor: pointer;
  font-weight: 500;
  margin-left: 4px;

  &:hover {
    text-decoration: underline;
  }
`;
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  border-radius: 8px;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

const StyledVideo = styled.video`
  width: 100%;
  max-height: 400px;
  border-radius: 8px;
  margin-top: 0.5rem;
`;

const PostContent = ({ content, mediaUrls }) => {
  const safeMediaUrls = Array.isArray(mediaUrls) ? mediaUrls : [];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTextExpanded, setIsTextExpanded] = useState(false);

  const lang = /[\u0600-\u06FF]/.test(content) ? "ar" : "en";

  const images = safeMediaUrls.filter((url) => !url.endsWith(".mp4"));
  const videos = safeMediaUrls.filter((url) => url.endsWith(".mp4"));

  const handleImageClick = (index, e) => {
    e.stopPropagation();
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const expandText = () => {
    setIsTextExpanded((expand) => !expand);
  };

  if (!content && images.length === 0 && videos.length === 0) return null;

  const textContent = isTextExpanded ? content : `${content?.slice(0, 55)}...`;

  return (
    <>
      {/* {content && (
        <ContentWrapper lang={lang}>
          {content.length > 55 ? (
            <>
              {textContent}
              <ReadMoreButton onClick={expandText}>
                {isTextExpanded ? "Read less" : "Read more"}
              </ReadMoreButton>
            </>
          ) : (
            content
          )}
        </ContentWrapper>
      )} */}

      <ContentWrapper lang={lang}>
        {content?.length > 55 ? (
          <>
            {textContent}
            <ReadMoreSpan onClick={expandText}>
              {isTextExpanded ? " Read less" : " Read more"}
            </ReadMoreSpan>
          </>
        ) : (
          content
        )}
      </ContentWrapper>

      {images.length > 0 && (
        <MediaGrid count={Math.min(images.length, 4)}>
          {images.slice(0, 4).map((url, index) => {
            const showOverlay = index === 3 && images.length > 4;
            return (
              <MediaItem
                key={index}
                count={images.length}
                index={index}
                onClick={(e) => handleImageClick(index, e)}
              >
                <StyledImage src={url} alt={`media-${index}`} />
                {showOverlay && <Overlay>+{images.length - 4}</Overlay>}
              </MediaItem>
            );
          })}
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
