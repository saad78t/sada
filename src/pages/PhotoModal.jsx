import PhotoModalOverlay from "../components/PhotoModalPages/PhotoModalOverlay";
import PhotoModalImageSection from "../components/PhotoModalPages/PhotoModalImageSection";
import PhotoModalInfoSection from "../components/PhotoModalPages/PhotoModalInfoSection";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../services/postService";
import { useParams } from "react-router-dom";
import Spinner from "../Shared/Spinner";

const PhotoModal = () => {
  const { id } = useParams();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
    enabled: !!id,
  });

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
