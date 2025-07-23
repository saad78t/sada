import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styled from "styled-components";
import { memo, useRef } from "react";
import videojs from "video.js";
import VideoJsPlayer from "../Post/VideoJsPlayer";

const MediaWrapper = styled.div`
  width: 100%;
  max-height: 600px;
  overflow: hidden;
  border-radius: 12px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
`;

const StyledVideoWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  background: #000;

  .video-js {
    width: 100% !important;
    height: 100% !important;
    object-fit: contain;
  }
`;

const PostDetailsMedia = ({ mediaUrls = [] }) => {
  // console.log("PostDetailsMedia render");
  const playerRef = useRef([]);

  if (!mediaUrls?.length) return null;

  const isVideo = (url) => {
    const cleanUrl = url.split("?")[0];
    return /\.(mp4|webm|ogg)$/i.test(cleanUrl);
  };

  const allMedia = mediaUrls.filter((url) => typeof url === "string");
  const onlyVideos = allMedia.filter(isVideo);

  const isSingleVideoPost = allMedia.length === 1 && onlyVideos.length === 1;

  const handleSlideChange = (swiper) => {
    playerRef.current.forEach((player, index) => {
      if (player) {
        if (index === swiper.activeIndex) {
          player.play();
        } else {
          player.pause();
          player.currentTime(0);
        }
      }
    });
  };

  return (
    <MediaWrapper>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
        onSlideChange={handleSlideChange}
        autoHeight={true}
        style={{ borderRadius: "12px" }}
      >
        {allMedia.map((url, index) => (
          <SwiperSlide key={index}>
            {isVideo(url) ? (
              <StyledVideoWrapper>
                <VideoJsPlayer
                  options={{
                    autoplay: isSingleVideoPost,
                    controls: true,
                    responsive: true,
                    fluid: false,
                    loop: false,
                    muted: false,
                    controlBar: {
                      skipButtons: {
                        forward: 10,
                        backward: 10,
                      },
                    },
                    sources: [
                      {
                        src: url,
                        type: "video/mp4",
                      },
                    ],
                  }}
                  onReady={(player) => {
                    playerRef.current[index] = player;

                    player.on("waiting", () => {
                      videojs.log("player is waiting");
                    });

                    player.on("dispose", () => {
                      videojs.log("player will dispose");
                    });
                  }}
                />
              </StyledVideoWrapper>
            ) : (
              <StyledImage src={url} alt={`media-${index}`} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </MediaWrapper>
  );
};

export default memo(PostDetailsMedia);
