import StyledImage from "./StyledImage";

const PostContentImage = ({ src, alt }) => {
  return (
    <StyledImage
      src={src}
      alt={alt || "post image"}
      onError={(e) => {
        console.error("Image load error:", src, e.message);
        e.target.style.display = "none"; // تخفي الصورة لو فيها خطأ
      }}
    />
  );
};

export default PostContentImage;
