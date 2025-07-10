import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../services/postService";

export function usePost(postId) {
  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });
  return {
    post,
    isLoading,
    error,
  };
}
