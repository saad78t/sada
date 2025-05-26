import { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

const ContentWrapper = styled.div`
  direction: ${({ lang }) => (lang === "ar" ? "rtl" : "ltr")};
  text-align: start;
  margin-bottom: 0.5rem;
  padding-left: 52px; /* محاذاة المحتوى مع بداية الاسم */
  padding-right: 16px; /* مسافة على اليمين زي السكرين شوت */
`;

const TextContent = styled.div`
  margin-bottom: 10px;
  white-space: pre-wrap;
`;

const MediaGrid = styled.div`
  display: grid;
  gap: 4px;
  width: 100%;
  ${({ $count }) => {
    if ($count === 1) return `grid-template-columns: 1fr;`;
    if ($count === 2) return `grid-template-columns: 1fr 1fr;`;
    if ($count === 3)
      return `
        grid-template-columns: 2fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-template-areas:
          'main side1'
          'main side2';
      `;
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
  white-space: nowrap; /* خلي Read more على سطر واحد */
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

const PostContent = ({ content, mediaUrls, postId }) => {
  const navigate = useNavigate();
  const safeMediaUrls = Array.isArray(mediaUrls) ? mediaUrls : [];
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

  // const handleImageClick = (index, e) => {
  //   e.stopPropagation();
  //   sessionStorage.setItem("scrollY", window.scrollY);
  //   sessionStorage.setItem("returnToPost", location.pathname);
  //   navigate(`/post/${postId}/photo/${index}`, {
  //     state: { from: location.pathname },
  //   });
  // };

  const handleImageClick = (index, e) => {
    e.stopPropagation();
    sessionStorage.setItem("scrollY", window.scrollY);
    // حفظ مسار CommentThread الحالي
    sessionStorage.setItem("returnToPost", location.pathname + location.search); // يحفظ زي /comment/123?postId=456
    navigate(`/post/${postId}/photo/${index}`, {
      state: { from: location.pathname + location.search }, // يحفظ مسار CommentThread
    });
  };

  const handleTextClick = () => {
    navigate(`/post/${postId}`);
  };

  const expandText = (e) => {
    e.stopPropagation();
    setIsTextExpanded((expand) => !expand);
  };

  if (!content && images.length === 0 && videos.length === 0) return null;

  const textContent = isTextExpanded ? content : `${content?.slice(0, 65)}...`;

  return (
    // <ContentWrapper lang={lang} onClick={handleTextClick}>
    <ContentWrapper lang={lang} onClick={handleTextClick}>
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
        <MediaGrid
          $count={Math.min(images.length + videos.length, 4)}
          onClick={handleTextClick}
        >
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
              {index === 3 && images.length + videos.length > 4 && (
                <Overlay>+{images.length + videos.length - 4}</Overlay>
              )}
            </MediaItem>
          ))}
          {videos.slice(0, 4 - images.length).map((url, index) => (
            <MediaItem
              key={index + images.length}
              $count={images.length + videos.length}
              $index={index + images.length}
              onClick={(e) => e.stopPropagation()}
            >
              <StyledVideo
                controls
                preload="metadata"
                onError={(e) => console.error("Video error:", url, e.message)}
              >
                <source src={url} type="video/mp4" />
                <source src={url} type="video/webm" />
                <source src={url} type="video/ogg" />
                Your browser does not support the video tag.
              </StyledVideo>
            </MediaItem>
          ))}
        </MediaGrid>
      )}
    </ContentWrapper>
  );
};

export default PostContent;
