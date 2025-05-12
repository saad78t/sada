import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ArrowLeft, ImagePlus } from "lucide-react";
import { useForm } from "react-hook-form";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  font-size: 1.5rem;

  &:hover {
    opacity: 0.8;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.textColor};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.bgColor};
  border-radius: 8px;
  padding: 0.8rem 1.2rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 1rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  resize: vertical;
`;

const FileRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

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

const SubmitButton = styled.button`
  padding: 0.75rem 1.25rem;
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  align-self: flex-end;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
`;

const NewPost = () => {
  const navigate = useNavigate();
  const [mediaFiles, setMediaFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Update previews whenever mediaFiles change
  useEffect(() => {
    const newPreviews = mediaFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setPreviews(newPreviews);

    // Cleanup: revoke object URLs when component unmounts or files change
    return () => {
      newPreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [mediaFiles]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles(files);
  };

  const onSubmit = (data) => {
    console.log("Form data:", data);
    console.log("Media files:", mediaFiles);
    // Here you can handle form submission and upload to Supabase or backend
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate("/")}>
          <ArrowLeft />
        </BackButton>
        <Title>New Post</Title>
      </Header>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Enter a title" {...register("title")} />

        <TextArea
          placeholder="What's on your mind?"
          {...register("content", { required: "Content is required" })}
        />
        {errors.content && <span>{errors.content.message}</span>}

        <FileRow>
          <FileIconLabel htmlFor="mediaUpload" title="Upload images/videos">
            <ImagePlus size={20} />
          </FileIconLabel>
          <SubmitButton type="submit">Post</SubmitButton>
        </FileRow>

        <HiddenFileInput
          id="mediaUpload"
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileChange}
        />

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
      </Form>
    </Container>
  );
};

export default NewPost;
