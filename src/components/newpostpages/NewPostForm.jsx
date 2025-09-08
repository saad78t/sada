import { useState } from "react";
import { useForm } from "react-hook-form";
import UploadButton from "../newpostpages/UploadButton";
import MediaPreviewList from "../newpostpages/MediaPreviewList";
import { useMediaPreview } from "../../hooks/useMediaPreview";
import { Form, Input, TextArea, FileRow, SubmitButton } from "./styles";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function NewPostForm({ mutate, isCreating }) {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm();

  useMediaPreview(mediaFiles, setPreviews);

  const onSubmit = (data) => {
    if (!data.content?.trim() && mediaFiles.length === 0) {
      toast.error("Post must contain text or media");
      return;
    }
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
      <Input
        placeholder="Enter a title"
        {...register("title")}
        disabled={isCreating}
      />

      <TextArea
        placeholder="What's on your mind?"
        {...register("content")}
        disabled={isCreating}
      />
      {/* {errors.content && (
        <span style={{ color: "red", fontSize: "0.9rem" }}>
          {errors.content.message}
        </span>
      )} */}

      <FileRow>
        <UploadButton setMediaFiles={setMediaFiles} disabled={isCreating} />
        <SubmitButton type="submit" disabled={isCreating}>
          {isCreating ? (
            <span>
              Posting
              <span className="dots" />
            </span>
          ) : (
            "Post"
          )}
        </SubmitButton>
      </FileRow>
      <MediaPreviewList
        previews={previews}
        setMediaFiles={setMediaFiles}
        setPreviews={setPreviews}
        isCreating={isCreating}
      />
    </Form>
  );
}

export default NewPostForm;
