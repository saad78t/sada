import { useState } from "react";
import { useForm } from "react-hook-form";
import UploadButton from "../newpostpages/UploadButton";
import MediaPreviewList from "../newpostpages/MediaPreviewList";
import { useMediaPreview } from "../../hooks/useMediaPreview";
import { Form, Input, TextArea, FileRow, SubmitButton } from "./styles";
import { useNavigate } from "react-router-dom";
import { useCreatePost } from "../../hooks/usePost";

function NewPostForm() {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const navigate = useNavigate();
  const { mutate, isPending: isCreating } = useCreatePost();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useMediaPreview(mediaFiles, setPreviews);

  const onSubmit = (data) => {
    mutate(
      { ...data, media_urls: mediaFiles },
      {
        onSuccess: () => {
          reset();
          navigate("/");
        },
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="Enter a title" {...register("title")} />

      <TextArea
        placeholder="What's on your mind?"
        {...register("content", { required: "Content is required" })}
      />
      {errors.content && (
        <span style={{ color: "red", fontSize: "0.9rem" }}>
          {errors.content.message}
        </span>
      )}

      <FileRow>
        <UploadButton setMediaFiles={setMediaFiles} disabled={isCreating} />
        <SubmitButton type="submit" disabled={isCreating}>
          {isCreating ? "Posting..." : "Post"}{" "}
        </SubmitButton>
      </FileRow>
      <MediaPreviewList
        previews={previews}
        setMediaFiles={setMediaFiles}
        setPreviews={setPreviews}
      />
    </Form>
  );
}

export default NewPostForm;
