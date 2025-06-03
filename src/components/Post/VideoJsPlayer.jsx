// import React from "react";
// // import styled from "styled-components";
// import videojs from "video.js";
// import "video.js/dist/video-js.css";

// function VideoJsPlayer(props) {
//   const videoRef = React.useRef(null);
//   const playerRef = React.useRef(null);
//   const { options, onReady } = props;

//   React.useEffect(() => {
//     // Make sure Video.js player is only initialized once
//     if (!playerRef.current) {
//       // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
//       const videoElement = document.createElement("video-js");

//       videoElement.classList.add("vjs-big-play-centered");
//       videoRef.current.appendChild(videoElement);

//       const player = (playerRef.current = videojs(videoElement, options, () => {
//         videojs.log("player is ready");
//         onReady && onReady(player);
//       }));

//       // You could update an existing player in the `else` block here
//       // on prop change, for example:
//     } else {
//       const player = playerRef.current;

//       player.autoplay(options.autoplay);
//       player.src(options.sources);
//     }
//   }, [options, videoRef, onReady]);

//   // Dispose the Video.js player when the functional component unmounts
//   React.useEffect(() => {
//     const player = playerRef.current;

//     return () => {
//       if (player && !player.isDisposed()) {
//         player.dispose();
//         playerRef.current = null;
//       }
//     };
//   }, [playerRef]);

//   return (
//     //style={{ width: "600", height: "300" }}
//     <div data-vjs-player>
//       <div ref={videoRef} />
//     </div>
//   );
// }

// export default VideoJsPlayer;

//videojsplayer edited

import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import styled from "styled-components";

const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  position: relative;

  video {
    width: 100% !important;
    height: 100% !important;
    object-fit: contain;
  }

  .video-js {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .vjs-control-bar {
    position: absolute !important;
    bottom: 0 !important;
    width: 100% !important;
    z-index: 10;
  }

  .vjs-big-play-button {
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%);
  }

  .tap-left,
  .tap-right {
    position: absolute;
    top: 0;
    bottom: 50px; /* حتى ما تغطي شريط الكنترول */
    width: 50%;
    z-index: 5;
    cursor: pointer;
    background: transparent;
  }

  .tap-left {
    left: 0;
  }

  .tap-right {
    right: 0;
  }

  .tap-left:hover,
  .tap-right:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

function VideoJsPlayer({ options, onReady }) {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);

  React.useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.className =
        "video-js vjs-default-skin vjs-big-play-centered";
      videoRef.current.appendChild(videoElement);

      const player = videojs(videoElement, options, () => {
        if (onReady) {
          onReady(player);
        }
      });

      playerRef.current = player;
    } else if (playerRef.current) {
      playerRef.current.src(options.sources);
    }
  }, [options, onReady]);

  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  const skip = (seconds) => {
    const player = playerRef.current;
    if (player && typeof player.currentTime === "function") {
      player.currentTime(player.currentTime() + seconds);
    }
  };

  return (
    <VideoContainer>
      <div ref={videoRef} />
      <div className="tap-left" onDoubleClick={() => skip(-10)} />
      <div className="tap-right" onDoubleClick={() => skip(10)} />
    </VideoContainer>
  );
}

export default VideoJsPlayer;
