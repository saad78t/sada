import styled from "styled-components";
import { ImagePlus } from "lucide-react";

const FileIconLabel = styled.label`
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  padding: 0.6rem;
  border-radius: 8px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

function UploadButton({ setMediaFiles }) {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles(files);
  };

  return (
    <>
      <FileIconLabel htmlFor="mediaUpload" title="Upload images/videos">
        <ImagePlus size={20} />
      </FileIconLabel>

      <HiddenFileInput
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
