import styled from "styled-components";

const PreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const PreviewItem = styled.div`
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.bgColor};
  display: flex;
  align-items: center;
  justify-content: center;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function MediaPreviewList({ previews }) {
  return (
    <>
      {previews.length > 0 && (
        <PreviewContainer>
          {previews.map(({ file, url }, i) => (
            <PreviewItem key={i}>
              {file.type.startsWith("image") ? (
                <img src={url} alt={`Preview ${i}`} />
              ) : file.type.startsWith("video") ? (
                <video src={url} controls />
              ) : null}
            </PreviewItem>
          ))}
        </PreviewContainer>
      )}
    </>
  );
}

export default MediaPreviewList;
