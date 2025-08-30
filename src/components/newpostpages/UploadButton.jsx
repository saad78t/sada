import styled from "styled-components";
import { ImagePlus } from "lucide-react";

const FileIconLabel = styled.label`
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  padding: 0.6rem;
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
`;

const HiddenFileInput = styled.input`
  display: none;
  label:has(input:disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function UploadButton({ setMediaFiles, disabled }) {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles(files);
  };

  return (
    <>
      <FileIconLabel
        htmlFor="mediaUpload"
        title="Upload images/videos"
        disabled={disabled}
      >
        <ImagePlus size={20} />
      </FileIconLabel>

      <HiddenFileInput
        disabled={disabled}
        id="mediaUpload"
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={handleFileChange}
      />
    </>
  );
}

export default UploadButton;
