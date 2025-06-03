import { useRef, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

const ContentWrapper = styled.div`
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};
  text-align: start; /*Using start instead of left or right makes the code dynamically support both directions.*/
  margin-bottom: 0.5rem;
  padding-left: 52px; /* Align content with the beginning of the name */
  padding-right: 16px;
`;

const TextContent = styled.div`
  margin-bottom: 10px;
  white-space: pre-wrap; /*Preserves lines and spaces and automatically breaks a line if it gets too narrow.*/
`;

const MediaGrid = styled.div`
  display: grid;
  direction: ltr;
  gap: 4px;
  width: 100%; /*The grid takes up the entire width of the parent element. */
  ${({ $count }) => {
    if ($count === 1) return `grid-template-columns: 1fr;`;
    if ($count === 2) return `grid-template-columns: 1fr 1fr;`;
    /* The first column takes "2fr" → meaning twice the size of the second column.
     * fr means "Fraction" (relative fraction of the remaining area).
     */
    if ($count === 3)
      return `
        grid-template-columns: 2fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-template-areas:
          'main side1'
          'main side2';
      `;
    /*max-height prevents the grid from growing larger than 360px. */
    return `
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      max-height: 360px;
    `;
  }}
`;

const MediaItem = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 8px;

  ${({ $count, $index }) => {
    if ($count === 3) {
      if ($index === 0) return "grid-area: main;";
      if ($index === 1) return "grid-area: side1;";
      if ($index === 2) return "grid-area: side2;";
    }
    return "";
  }}

  ${({ $count }) => {
    if ($count === 1) return `max-height: 400px;`;
    if ($count >= 4)
      return `
        aspect-ratio: 1 / 1;
        height: 150px;
      `;
    return `aspect-ratio: 1 / 1;`;
  }}
`;

const ReadMoreSpan = styled.span`
  color: ${({ theme }) => theme.readMoreColor || "#1da1f2"};
  cursor: pointer;
  font-weight: 500;
  margin-left: 4px;
  white-space: nowrap; /* Keep Read more on one line */
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

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  background: #000;
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

const SoundToggleButton = styled.button`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
`;

const PostContent = ({ content, mediaUrls, postId }) => {
  const navigate = useNavigate();
  const safeMediaUrls = Array.isArray(mediaUrls) ? mediaUrls : [];
  const [currentAudioIndex, setCurrentAudioIndex] = useState(null);
  const videoRefs = useRef([]);

  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const location = useLocation();

  const lang = /[\u0600-\u06FF]/.test(content) ? "ar" : "en";

  const images = safeMediaUrls.filter((url) => {
    if (typeof url !== "string") return false;
    return !/\.(mp4|webm|ogg)/i.test(url);
  });
  const videos = safeMediaUrls.filter((url) => {
    if (typeof url !== "string") return false;
    return /\.(mp4|webm|ogg)/i.test(url);
  });

  /*  const totalMediaCount = images.length + videos.length;
  const maxVisibleMedia = 4;
  const visibleCount = Math.min(totalMediaCount, maxVisibleMedia);

  const isLastVisibleItem = (index) => {
    // في حالة الصور
    if (index < images.length) {
      return index + 1 === visibleCount;
    }
    // في حالة الفيديوهات (index هنا يبدأ من 0 بالنسبة للفيديوهات)
    // لذلك نضيف عدد الصور عشان نحسب ترتيبه في القائمة الكاملة
    const videoIndexInTotal = index + images.length + 1;
    return videoIndexInTotal === visibleCount;
  }; */

  const handleImageClick = (index, e) => {
    e.stopPropagation();
    sessionStorage.setItem("scrollY", window.scrollY);
    // حفظ مسار CommentThread الحالي
    sessionStorage.setItem("returnToPost", location.pathname + location.search); // يحفظ زي /comment/123?postId=456
    navigate(`/post/${postId}/photo/${index}`, {
      state: { from: location.pathname + location.search }, // يحفظ مسار CommentThread
    });
  };

  const expandText = (e) => {
    e.stopPropagation();
    setIsTextExpanded((expand) => !expand);
  };

  if (!content && images.length === 0 && videos.length === 0) return null;

  const textContent = isTextExpanded ? content : `${content?.slice(0, 65)}...`;

  return (
    <ContentWrapper lang={lang}>
      <TextContent>
        {content?.length > 65 ? (
          <>
            {textContent}
            <ReadMoreSpan onClick={expandText}>
              {isTextExpanded ? " Read less" : " Read more"}
            </ReadMoreSpan>
          </>
        ) : (
          content
        )}
      </TextContent>

      {(images.length > 0 || videos.length > 0) && (
        //Count the number of photos + videos, and the maximum is 4
        <MediaGrid $count={Math.min(images.length + videos.length, 4)}>
          {images.slice(0, 4).map((url, index) => (
            <MediaItem
              key={index}
              $count={images.length + videos.length}
              $index={index}
              onClick={(e) => handleImageClick(index, e)}
            >
              <StyledImage
                src={url}
                alt={`media-${index}`}
                onError={(e) => console.error("Image error:", url, e.message)}
              />
              {index + 1 === Math.min(images.length + videos.length, 4) &&
                images.length + videos.length > 4 && (
                  <Overlay>+{images.length + videos.length - 4}</Overlay>
                )}
            </MediaItem>
          ))}
          {/* {videos.slice(0, 4 - images.length).map((url, index) => (
            <MediaItem
              key={index + images.length}
              $count={images.length + videos.length}
              $index={index + images.length}
              onClick={(e) => {
                e.stopPropagation(),
                  e.preventDefault(),
                  handleImageClick(index + images.length, e);
              }}
            >
              <StyledVideo
                key={url}
                muted={true}
                autoPlay={true}
                loop={true}
                // controls
                preload="metadata"
                onError={(e) => console.error("Video error:", url, e.message)}
              >
                <source src={url} type="video/mp4" />
                <source src={url} type="video/webm" />
                <source src={url} type="video/ogg" />
                Your browser does not support the video tag.
              </StyledVideo>
              {index + images.length + 1 ===
                Math.min(images.length + videos.length, 4) &&
                images.length + videos.length > 4 && (
                  <Overlay>+{images.length + videos.length - 4}</Overlay>
                )}
            </MediaItem>
          ))} */}

          {videos.slice(0, 4 - images.length).map((url, index) => {
            const videoIndex = index + images.length;

            return (
              <MediaItem
                key={videoIndex}
                $count={images.length + videos.length}
                $index={videoIndex}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleImageClick(videoIndex, e);
                }}
              >
                <StyledVideo
                  ref={(el) => (videoRefs.current[videoIndex] = el)}
                  key={url}
                  muted={currentAudioIndex !== videoIndex}
                  autoPlay={true}
                  loop={true}
                  preload="metadata"
                  onError={(e) => console.error("Video error:", url, e.message)}
                >
                  <source src={url} type="video/mp4" />
                  <source src={url} type="video/webm" />
                  <source src={url} type="video/ogg" />
                  Your browser does not support the video tag.
                </StyledVideo>

                <SoundToggleButton
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setCurrentAudioIndex((prev) =>
                      prev === videoIndex ? null : videoIndex
                    );
                  }}
                >
                  {currentAudioIndex === videoIndex ? "🔈" : "🔇"}
                </SoundToggleButton>

                {videoIndex + 1 ===
                  Math.min(images.length + videos.length, 4) &&
                  images.length + videos.length > 4 && (
                    <Overlay>+{images.length + videos.length - 4}</Overlay>
                  )}
              </MediaItem>
            );
          })}
        </MediaGrid>
      )}
    </ContentWrapper>
  );
};

export default PostContent;
