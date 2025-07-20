import { useState } from "react";
import { useForm } from "react-hook-form";
import UploadButton from "../newpostpages/UploadButton";
import MediaPreviewList from "../newpostpages/MediaPreviewList";
import { useMediaPreview } from "../../hooks/useMediaPreview";
import { Form, Input, TextArea, FileRow, SubmitButton } from "./styles";

function NewPostForm() {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useMediaPreview(mediaFiles, setPreviews);

  const onSubmit = (data) => {
    console.log("Form data:", data);
    console.log("Media files:", mediaFiles);
    // Here you can handle form submission and upload to Supabase or backend
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
        <UploadButton setMediaFiles={setMediaFiles} />
        <SubmitButton type="submit">Post</SubmitButton>
      </FileRow>
      <MediaPreviewList previews={previews} />
    </Form>
  );
}

export default NewPostForm;
