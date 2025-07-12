import { useQuery } from "@tanstack/react-query";
import { getLikes } from "../services/likeService";

export function useGetLikes(postId) {
  const { data: likes = [], isLoading: likesLoading } = useQuery({
    queryKey: ["likes", postId],
    queryFn: () => getLikes(postId),
    enabled: !!postId,
  });

  return {
    likes,
    likesLoading,
  };
}
