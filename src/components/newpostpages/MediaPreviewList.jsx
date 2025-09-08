import styled from "styled-components";
import { XCircle } from "lucide-react";
import Button from "../../Shared/Button";
import { disabledStyles } from "./styles";
const PreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: ${({ disabled }) =>
    disabled ? "#d3d3d3" : "rgba(255, 0, 0, 0.7)"};
  color: ${({ disabled, theme }) => (disabled ? "#777" : theme.buttonText)};
  border: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  color: white;
  padding: 0.3rem;
  border-radius: 50%;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ disabled }) =>
      disabled ? "#d3d3d3" : "rgba(255, 0, 0, 0.9)"};
  }

  ${disabledStyles}
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

export const DeleteAll = styled(Button)`
  background-color: ${({ disabled }) => (disabled ? "#d3d3d3" : "#d32f2f")};
  color: ${({ disabled, theme }) => (disabled ? "#777" : theme.buttonText)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-weight: bold;
  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#d3d3d3" : "#ff0000")};
    transition: background-color 0.3s ease;
  }

  ${disabledStyles}
`;

function MediaPreviewList({
  previews,
  setMediaFiles,
  setPreviews,
  isCreating,
}) {
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
                <CloseButton
                  type="button"
                  onClick={() => deleteItem(i)}
                  disabled={isCreating}
                >
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
            <DeleteAll
              type="button"
              onClick={deleteAllMedia}
              disabled={isCreating}
            >
              Delete All
            </DeleteAll>
          </div>
        </>
      )}
    </>
  );
}

export default MediaPreviewList;
