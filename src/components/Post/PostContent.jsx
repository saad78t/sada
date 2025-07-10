import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ContentWrapper from "./PostContentPages/ContentWrapper";
import MediaGrid from "./PostContentPages/MediaGrid";
import MediaItem from "./PostContentPages/MediaItem";
import Overlay from "./PostContentPages/Overlay";
import PostContentText from "./PostContentPages/PostContentText";
import ReadMoreSpan from "./PostContentPages/ReadMoreSpan";
import PostContentImage from "./PostContentPages/PostContentImage";
import PostContentVideo from "./PostContentPages/PostContentVideo";

const PostContent = ({ content, mediaUrls, postId }) => {
  const navigate = useNavigate();
  const safeMediaUrls = Array.isArray(mediaUrls) ? mediaUrls : [];
  const [currentAudioIndex, setCurrentAudioIndex] = useState(null);
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const videoRefs = useRef([]);
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
              <PostContentImage src={url} alt={`media-${index}`} />

              {index + 1 === Math.min(images.length + videos.length, 4) &&
                images.length + videos.length > 4 && (
                  <Overlay>+{images.length + videos.length - 4}</Overlay>
                )}
            </MediaItem>
          ))}

          {videos.slice(0, 4 - images.length).map((url, index) => {
            const videoIndex = index + images.length;

            return (
              <PostContentVideo
                key={videoIndex}
                url={url}
                videoIndex={videoIndex}
                imagesLength={images.length}
                totalMediaCount={images.length + videos.length}
                videoRefs={videoRefs}
                currentAudioIndex={currentAudioIndex}
                setCurrentAudioIndex={setCurrentAudioIndex}
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
