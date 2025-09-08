import styled from "styled-components";
import { ImagePlus } from "lucide-react";
import toast from "react-hot-toast";
import { disabledStyles } from "./styles";

const FileIconLabel = styled.label`
  background-color: ${({ disabled, theme }) =>
    disabled ? "#d3d3d3" : theme.buttonBg};
  color: ${({ disabled, theme }) => (disabled ? "#777" : theme.buttonText)};
  padding: 0.6rem;
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ disabled, theme }) =>
      disabled ? "#d3d3d3" : theme.buttonHover};
  }

  ${disabledStyles}
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

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "video/mp4",
      "video/webm",
    ];

    // الملفات غير المدعومة
    const invalidFiles = files.filter((f) => !allowedTypes.includes(f.type));
    if (invalidFiles.length > 0) {
      const names = invalidFiles.map((f) => f.name).join(", ");
      toast.error(`Unsupported files: ${names} ❌`);
    }

    const validFiles = files.filter((f) => allowedTypes.includes(f.type));

    setMediaFiles((prev) => {
      const existingNames = prev.map((f) => f.name + f.size + f.lastModified);
      const newFiles = validFiles.filter(
        (f) => !existingNames.includes(f.name + f.size + f.lastModified)
      );
      return [...prev, ...newFiles];
    });

    e.target.value = ""; // يجب عمل ريسيت للقيمه لان في حاله اول مره رفعت صوره وبعدين حذفتها من زر الاغلاق وبعدين رجعت مره ثانيه ارجعها حتى انشرها ما راح تنزل فهنا يرست القيمه
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
