import styled from "styled-components";
import { XCircle } from "lucide-react";
import Button from "../../Shared/Button";
const PreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(255, 0, 0, 0.7); /* أحمر شفاف بدل الأسود */
  border: none;
  cursor: pointer;
  color: white;
  padding: 0.3rem;
  border-radius: 50%;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 0, 0, 0.9); /* أوضح عند الهوفر */
  }
`;

const PreviewItem = styled.div`
  position: relative;
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

const DeleteAll = styled(Button)`
  background-color: #d32f2f;
  &:hover {
    background-color: #ff0000;
    transition: background-color 0.3s ease;
  }
`;

function MediaPreviewList({ previews, setMediaFiles, setPreviews }) {
  function deleteItem(index) {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  function deleteAllMedia() {
    setMediaFiles([]);
    setPreviews([]);
  }

  return (
    <>
      {previews.length > 0 && (
        <>
          <PreviewContainer>
            {previews.map(({ file, url }, i) => (
              <PreviewItem key={i}>
                <CloseButton type="button" onClick={() => deleteItem(i)}>
                  <XCircle size={18} />
                </CloseButton>
                {file.type.startsWith("image") ? (
                  <img src={url} alt={`Preview ${i}`} />
                ) : file.type.startsWith("video") ? (
                  <video src={url} controls />
                ) : null}
              </PreviewItem>
            ))}
          </PreviewContainer>
          <div>
            <DeleteAll type="button" onClick={deleteAllMedia}>
              Delete All
            </DeleteAll>
          </div>
        </>
      )}
    </>
  );
}

export default MediaPreviewList;
