import { useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import videojs from "video.js";
import PhotoModalNavButtons from "./PhotoModalNavButtons";
import PhotoModalCloseButton from "./PhotoModalCloseButton";
import PhotoModalMediaViewer from "./PhotoModalMediaViewer";

const ImageSection = styled.div`
  position: relative;
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
  width: 100%;
  height: 100%;
`;

function PhotoModalImageSection({ post }) {
  const { id, photoIndex } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const returnToPost = sessionStorage.getItem("returnToPost");
  const from = returnToPost || location.state?.from || "/";
  const playerRef = useRef(null);

  const mediaUrl = post.media_urls?.[photoIndex];
  const currentIndex = parseInt(photoIndex);
  const totalImages = post.media_urls?.length;
  const isVideo = /\.(mp4|webm|ogg)/i.test(mediaUrl);

  const handlePrev = () => {
    if (currentIndex > 0) {
      navigate(`/post/${id}/photo/${currentIndex - 1}`, {
        state: { from },
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < totalImages - 1) {
      navigate(`/post/${id}/photo/${currentIndex + 1}`, {
        state: { from },
      });
    }
  };

  const handleClose = () => {
    document.querySelectorAll("video").forEach((v) => {
      v.pause();
      v.currentTime = 0;
    });
    navigate(from);
    sessionStorage.removeItem("returnToPost");
  };

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: false,
    loop: true,
    muted: true,
    controlBar: {
      skipButtons: {
        forward: 10,
        backward: 10,
      },
    },
    sources: [
      {
        src: mediaUrl,
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    playerRef.current.pause();

    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <ImageSection onClick={(e) => e.stopPropagation()}>
      <PhotoModalNavButtons
        currentIndex={currentIndex}
        onNext={handleNext}
        onPrev={handlePrev}
        totalImages={totalImages}
      />
      <PhotoModalCloseButton onClose={handleClose} />
      <PhotoModalMediaViewer
        mediaUrl={mediaUrl}
        isVideo={isVideo}
        videoOptions={videoJsOptions}
        onVideoReady={handlePlayerReady}
      />
    </ImageSection>
  );
}

export default PhotoModalImageSection;
