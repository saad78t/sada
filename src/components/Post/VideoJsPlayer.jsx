import { useRef, useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import styled from "styled-components";

const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  position: relative;
  //<video> element
  video {
    width: 100% !important; //!important: Ensures that it outperforms any other formats coming from video.js or others.
    height: 100% !important;
    object-fit: contain;
  }

  .video-js {
    width: 100%;
    height: 100%;
    position: absolute; //This means we place the element above the container.
    top: 0; //Let it start from the upper left corner.
    left: 0; //Let it start from the upper left corner.
  }

  .vjs-control-bar {
    position: absolute !important;
    bottom: 0 !important;
    width: 100% !important;
    z-index: 30; //Ensures it appears above all other elements within the video.
  }

  .vjs-big-play-button {
    //This is the big play button that appears before playing on.
    top: 50% !important;
    left: 50% !important; //top: 50%, left: 50%: Centers the button on the container.
    transform: translate(
      -50%,
      -50%
    ); //The button moves itself until it is perfectly centered.
  }
`;

const SkipArea = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 25%;
  z-index: 20;
  background: transparent;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05); // تظهر بشكل خفيف عند الـ hover
  }
`;

const LeftSkip = styled(SkipArea)`
  left: 0;
  border-top-right-radius: 60% 100%;
  border-bottom-right-radius: 60% 100%;
`;

const RightSkip = styled(SkipArea)`
  right: 0;
  border-top-left-radius: 60% 100%;
  border-bottom-left-radius: 60% 100%;
`;

const SkipMessage = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 1rem;
  z-index: 30;
  pointer-events: none;
`;

function VideoJsPlayer({ options, onReady }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [skipMsg, setSkipMsg] = useState("");

  useEffect(() => {
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

  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  const skipTime = (seconds) => {
    const player = playerRef.current;
    if (player) {
      player.currentTime(player.currentTime() + seconds);
      setSkipMsg(
        `${seconds > 0 ? "⏩ Forward" : "⏪ Backward"} ${Math.abs(
          seconds
        )} Second`
      );
      setTimeout(() => setSkipMsg(""), 800);
    }
  };

  return (
    <VideoContainer>
      <div ref={videoRef} />
      <LeftSkip onDoubleClick={() => skipTime(-10)} />
      <RightSkip onDoubleClick={() => skipTime(10)} />
      {skipMsg && <SkipMessage>{skipMsg}</SkipMessage>}
    </VideoContainer>
  );
}

export default VideoJsPlayer;
