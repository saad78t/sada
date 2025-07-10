import styled from "styled-components";
import VideoJsPlayer from "../Post/VideoJsPlayer";

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

function PhotoModalMediaViewer({
  mediaUrl,
  isVideo,
  videoOptions,
  onVideoReady,
}) {
  return (
    <>
      {isVideo ? (
        <VideoJsPlayer options={videoOptions} onReady={onVideoReady} />
      ) : (
        <StyledImage
          key={mediaUrl}
          src={mediaUrl}
          alt="Post media"
          onError={(e) => console.error("Image failed:", mediaUrl, e.message)}
        />
      )}
    </>
  );
}

export default PhotoModalMediaViewer;
