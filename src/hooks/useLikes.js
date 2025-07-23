/* import { useQuery } from "@tanstack/react-query";
import { getLikes } from "../services/likeService";

export function useGetLikes(targetId, targetType) {
  const { data: likes = [], isLoading: likesLoading } = useQuery({
    queryKey: ["likes", targetId, targetType],
    queryFn: () => getLikes(targetId, targetType),
    enabled: !!targetId && !!targetType,
  });

  return {
    likes,
    likesLoading,
  };
}
 */
