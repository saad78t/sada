import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ContentWrapper from "./PostContentPages/ContentWrapper";
import MediaGrid from "./PostContentPages/MediaGrid";
import MediaItem from "./PostContentPages/MediaItem";
import Overlay from "./PostContentPages/Overlay";
import PostContentText from "./PostContentPages/PostContentText";
import ReadMoreSpan from "./PostContentPages/ReadMoreSpan";
import PostContentImage from "./PostContentPages/PostContentImage";
import PostContentVideo from "./PostContentPages/PostContentVideo";
import { useInView } from "react-intersection-observer";
import { resetVideos } from "../../utils/helpers";
import styled from "styled-components";

const Tittle = styled.span`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: block;
`;

const PostContent = ({ title, content, mediaUrls, postId }) => {
  const navigate = useNavigate();
  const safeMediaUrls = Array.isArray(mediaUrls) ? mediaUrls : [];
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const videoRefs = useRef([]);
  const location = useLocation();
  const { ref: postRef, inView: postVisible } = useInView({ threshold: 0.75 });

  const lang = /[\u0600-\u06FF]/.test(content) ? "ar" : "en";

  const orderedMedia = safeMediaUrls
    .filter((url) => typeof url === "string")
    .map((url, i) => ({
      url,
      type: /\.(mp4|webm|ogg)/i.test(url) ? "video" : "image",
      originalIndex: i,
    }));

  const handleImageClick = (index, e) => {
    e.stopPropagation();
    sessionStorage.setItem("scrollY", window.scrollY);
    sessionStorage.setItem("returnToPost", location.pathname + location.search);
    navigate(`/post/${postId}/photo/${index}`, {
      state: { from: location.pathname + location.search },
    });
  };

  const expandText = (e) => {
    e.stopPropagation();
    setIsTextExpanded((expand) => !expand);
  };

  const playVideosSequentially = () => {
    const videosArray = videoRefs.current.filter(Boolean);
    if (!videosArray.length) return;

    resetVideos(videosArray);

    const playNext = (i) => {
      if (i >= videosArray.length) return;
      const video = videosArray[i];
      video.play().catch(() => {});
      video.onended = () => playNext(i + 1);
    };

    playNext(0);
  };

  useEffect(() => {
    const videosArray = videoRefs.current.filter(Boolean);

    if (postVisible) {
      // إذا البوست ظاهر نشغّل بالتعاقب
      const hasVideos = orderedMedia.some((m) => m.type === "video");
      if (hasVideos) {
        playVideosSequentially();
      }
    } else {
      // إذا البوست مو ظاهر، نوقف كل الفيديوهات
      resetVideos(videosArray);
    }
  }, [postVisible, orderedMedia]);

  if (!content && orderedMedia.length === 0) return null;

  const textContent = isTextExpanded ? content : `${content?.slice(0, 65)}...`;

  return (
    <ContentWrapper ref={postRef} lang={lang}>
      <Tittle>{title}</Tittle>
      <PostContentText>
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
      </PostContentText>

      {orderedMedia.length > 0 && (
        <MediaGrid $count={Math.min(orderedMedia.length, 4)}>
          {orderedMedia.slice(0, 4).map((media, index) => {
            return media.type === "image" ? (
              <MediaItem
                key={media.originalIndex}
                $count={orderedMedia.length}
                $index={index}
                onClick={(e) => handleImageClick(media.originalIndex, e)}
              >
                <PostContentImage src={media.url} alt={`media-${index}`} />
                {index + 1 === 4 && orderedMedia.length > 4 && (
                  <Overlay>+{orderedMedia.length - 4}</Overlay>
                )}
              </MediaItem>
            ) : (
              <PostContentVideo
                key={media.originalIndex}
                url={media.url}
                videoIndex={index}
                totalMediaCount={orderedMedia.length}
                videoRefs={videoRefs}
                handleVideoClick={handleImageClick}
              />
            );
          })}
        </MediaGrid>
      )}
    </ContentWrapper>
  );
};

export default PostContent;
