import PhotoModalOverlay from "../components/PhotoModalPages/PhotoModalOverlay";
import PhotoModalImageSection from "../components/PhotoModalPages/PhotoModalImageSection";
import PhotoModalInfoSection from "../components/PhotoModalPages/PhotoModalInfoSection";
import { useParams } from "react-router-dom";
import Spinner from "../Shared/Spinner";
import { usePost } from "../hooks/usePost";

const PhotoModal = () => {
  const { id } = useParams();

  const { post, isLoading, error } = usePost(id);

  if (isLoading) return <Spinner />;
  if (error || !post) return <p>Error loading post</p>;

  return (
    <PhotoModalOverlay>
      <PhotoModalImageSection post={post} />
      <PhotoModalInfoSection post={post} />
    </PhotoModalOverlay>
  );
};

export default PhotoModal;
