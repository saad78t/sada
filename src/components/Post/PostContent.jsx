import styled from "styled-components";

const ContentText = styled.p`
  margin-bottom: 0.75rem;
  white-space: pre-wrap;
`;

const MediaContainer = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  margin-bottom: 0.75rem;
`;

const MediaItem = styled.div`
  width: 100%;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
`;

const MediaImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
`;

const MediaVideo = styled.video`
  width: 100%;
  height: auto;
  display: block;
`;

const PostContent = ({ content, mediaUrls }) => {
  const safeMediaUrls = Array.isArray(mediaUrls) ? mediaUrls : [];

  return (
    <>
      <ContentText>{content}</ContentText>

      {safeMediaUrls.length > 0 && (
        <MediaContainer>
          {safeMediaUrls.map((url, index) => (
            <MediaItem key={index}>
              {url.match(/\.(mp4|webm)$/i) ? (
                <MediaVideo src={url} controls />
              ) : (
                <MediaImage src={url} alt={`media-${index}`} />
              )}
            </MediaItem>
          ))}
        </MediaContainer>
      )}
    </>
  );
};

export default PostContent;
