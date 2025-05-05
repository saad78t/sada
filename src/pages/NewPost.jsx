import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ArrowLeft } from "lucide-react";

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

const FileInputLabel = styled.label`
  display: inline-block;
  padding: 0.75rem 1.25rem;
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  font-weight: bold;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.25rem;
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
`;

const NewPost = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);

  const handleFileChange = (e) => {
    setMedia(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Post content:", content);
    console.log("Media file:", media);
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate("/")}>
          <ArrowLeft />
        </BackButton>
        <Title>New Post</Title>
      </Header>

      <Form onSubmit={handleSubmit}>
        <TextArea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <FileInputLabel htmlFor="mediaUpload">
          Add Image or Video
        </FileInputLabel>
        <HiddenFileInput
          id="mediaUpload"
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
        />

        {media && <p>Selected file: {media.name}</p>}

        <SubmitButton type="submit">Post</SubmitButton>
      </Form>
    </Container>
  );
};

export default NewPost;
