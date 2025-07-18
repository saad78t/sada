// import { useEffect, useRef, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import ContentWrapper from "./PostContentPages/ContentWrapper";
// import MediaGrid from "./PostContentPages/MediaGrid";
// import MediaItem from "./PostContentPages/MediaItem";
// import Overlay from "./PostContentPages/Overlay";
// import PostContentText from "./PostContentPages/PostContentText";
// import ReadMoreSpan from "./PostContentPages/ReadMoreSpan";
// import PostContentImage from "./PostContentPages/PostContentImage";
// import PostContentVideo from "./PostContentPages/PostContentVideo";

// const PostContent = ({ content, mediaUrls, postId }) => {
//   const navigate = useNavigate();
//   const safeMediaUrls = Array.isArray(mediaUrls) ? mediaUrls : [];
//   const [currentAudioIndex, setCurrentAudioIndex] = useState(null);
//   const [isTextExpanded, setIsTextExpanded] = useState(false);
//   const videoRefs = useRef([]);
//   const location = useLocation();

//   const lang = /[\u0600-\u06FF]/.test(content) ? "ar" : "en";

//   const images = safeMediaUrls.filter((url) => {
//     if (typeof url !== "string") return false;
//     return !/\.(mp4|webm|ogg)/i.test(url);
//   });
//   const videos = safeMediaUrls.filter((url) => {
//     if (typeof url !== "string") return false;
//     return /\.(mp4|webm|ogg)/i.test(url);
//   });

//   const handleImageClick = (index, e) => {
//     e.stopPropagation();
//     sessionStorage.setItem("scrollY", window.scrollY);
//     sessionStorage.setItem("returnToPost", location.pathname + location.search);
//     navigate(`/post/${postId}/photo/${index}`, {
//       state: { from: location.pathname + location.search },
//     });
//   };

//   const expandText = (e) => {
//     e.stopPropagation();
//     setIsTextExpanded((expand) => !expand);
//   };

//   const playVideosSequentially = () => {
//     const videosArray = videoRefs.current.filter(Boolean);
//     if (!videosArray.length) return;

//     videosArray.forEach((v) => {
//       v.pause();
//       v.onended = null;
//       v.currentTime = 0;
//     });

//     const playNext = (i) => {
//       if (i >= videosArray.length) return;
//       const video = videosArray[i];
//       video.play().catch(() => {});
//       video.onended = () => playNext(i + 1);
//     };

//     playNext(0);
//   };

//   useEffect(() => {
//     playVideosSequentially();
//   }, [videos]);

//   if (!content && images.length === 0 && videos.length === 0) return null;

//   const textContent = isTextExpanded ? content : `${content?.slice(0, 65)}...`;

//   return (
//     <ContentWrapper lang={lang}>
//       <PostContentText>
//         {content?.length > 65 ? (
//           <>
//             {textContent}
//             <ReadMoreSpan onClick={expandText}>
//               {isTextExpanded ? " Read less" : " Read more"}
//             </ReadMoreSpan>
//           </>
//         ) : (
//           content
//         )}
//       </PostContentText>

//       {(images.length > 0 || videos.length > 0) && (
//         <MediaGrid $count={Math.min(images.length + videos.length, 4)}>
//           {images.slice(0, 4).map((url, index) => (
//             <MediaItem
//               key={index}
//               $count={images.length + videos.length}
//               $index={index}
//               onClick={(e) => handleImageClick(index, e)}
//             >
//               <PostContentImage src={url} alt={`media-${index}`} />
//               {index + 1 === Math.min(images.length + videos.length, 4) &&
//                 images.length + videos.length > 4 && (
//                   <Overlay>+{images.length + videos.length - 4}</Overlay>
//                 )}
//             </MediaItem>
//           ))}

//           {videos.slice(0, 4 - images.length).map((url, index) => {
//             const videoIndex = index + images.length;
//             return (
//               <PostContentVideo
//                 key={videoIndex}
//                 url={url}
//                 videoIndex={videoIndex}
//                 totalMediaCount={images.length + videos.length}
//                 videoRefs={videoRefs}
//                 currentAudioIndex={currentAudioIndex}
//                 setCurrentAudioIndex={setCurrentAudioIndex}
//                 handleVideoClick={handleImageClick}
//               />
//             );
//           })}
//         </MediaGrid>
//       )}
//     </ContentWrapper>
//   );
// };

// export default PostContent;

/*
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

const PostContent = ({ content, mediaUrls, postId }) => {
  const navigate = useNavigate();
  const safeMediaUrls = Array.isArray(mediaUrls) ? mediaUrls : [];
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const videoRefs = useRef([]);
  const location = useLocation();

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
    // Get an array of all defined video elements (remove null/undefined refs).
    // This prevents attempting to play or access videos that have not been mounted yet.
    // Useful for ensuring only actual video DOM elements are included.
    const videosArray = videoRefs.current.filter(Boolean);
    if (!videosArray.length) return;

    videosArray.forEach((v) => {
      v.pause();
      v.onended = null;
      v.currentTime = 0;
    });

    const playNext = (i) => {
      if (i >= videosArray.length) return;
      const video = videosArray[i];
      video.play().catch(() => {});
      video.onended = () => playNext(i + 1);
    };

    playNext(0);
  };

  useEffect(() => {
    playVideosSequentially();
  }, [orderedMedia]);

  if (!content && orderedMedia.length === 0) return null;

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
*/

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

const PostContent = ({ content, mediaUrls, postId }) => {
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
