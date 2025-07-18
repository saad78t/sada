// import StyledVideo from "./StyledVideo";
// import MediaItem from "./MediaItem";
// import Overlay from "./Overlay";
// import SoundToggleButton from "./SoundToggleButton";

// const PostContentVideo = ({
//   url,
//   videoIndex,
//   totalMediaCount,
//   videoRefs,
//   currentAudioIndex,
//   setCurrentAudioIndex,
//   handleVideoClick,
// }) => {
//   return (
//     <MediaItem
//       key={videoIndex}
//       $count={totalMediaCount}
//       $index={videoIndex}
//       onClick={(e) => {
//         e.stopPropagation();
//         e.preventDefault();
//         handleVideoClick(videoIndex, e);
//       }}
//     >
//       <StyledVideo
//         ref={(el) => (videoRefs.current[videoIndex] = el)}
//         key={url}
//         muted={currentAudioIndex !== videoIndex}
//         autoPlay={true}
//         loop={true}
//         preload="metadata"
//         onError={(e) => console.error("Video error:", url, e.message)}
//       >
//         <source src={url} type="video/mp4" />
//         <source src={url} type="video/webm" />
//         <source src={url} type="video/ogg" />
//         Your browser does not support the video tag.
//       </StyledVideo>

//       <SoundToggleButton
//         onClick={(e) => {
//           e.stopPropagation();
//           e.preventDefault();
//           setCurrentAudioIndex((prev) =>
//             prev === videoIndex ? null : videoIndex
//           );
//         }}
//       >
//         {currentAudioIndex === videoIndex ? "🔈" : "🔇"}
//       </SoundToggleButton>

//       {videoIndex + 1 === Math.min(totalMediaCount, 4) &&
//         totalMediaCount > 4 && <Overlay>+{totalMediaCount - 4}</Overlay>}
//     </MediaItem>
//   );
// };

// export default PostContentVideo;

import { useEffect, useState } from "react";
import StyledVideo from "./StyledVideo";
import MediaItem from "./MediaItem";
import Overlay from "./Overlay";
import SoundToggleButton from "./SoundToggleButton";

const PostContentVideo = ({
  url,
  videoIndex,
  totalMediaCount,
  videoRefs,
  handleVideoClick,
}) => {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRefs.current[videoIndex];
    if (video) {
      video.muted = isMuted;
    }
  }, [isMuted, videoIndex, videoRefs]);

  return (
    <MediaItem
      key={videoIndex}
      $count={totalMediaCount}
      $index={videoIndex}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleVideoClick(videoIndex, e);
      }}
    >
      <StyledVideo
        ref={(el) => {
          if (el) {
            videoRefs.current[videoIndex] = el;
            el.muted = isMuted;
          }
        }}
        key={url}
        autoPlay={false}
        loop={false}
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

          const video = videoRefs.current[videoIndex];
          if (!video) return;

          setIsMuted((prev) => {
            video.muted = !prev;
            return !prev; // Return value is necessary here because it's assigned to another property, so we must return it.
          });
        }}
      >
        {isMuted ? "🔇" : "🔈"}
      </SoundToggleButton>

      {videoIndex + 1 === Math.min(totalMediaCount, 4) &&
        totalMediaCount > 4 && <Overlay>+{totalMediaCount - 4}</Overlay>}
    </MediaItem>
  );
};

export default PostContentVideo;
