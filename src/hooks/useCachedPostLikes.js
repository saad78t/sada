import { useQueryClient } from "@tanstack/react-query";
import { useGetLikesMap } from "./useGetLikesMap";
import { useMemo } from "react";

export function useCachedPostLikes(postId) {
  const queryClient = useQueryClient();

  const cachedLikesMap = queryClient.getQueryData(["likes-map", "post"]);

  const cachedLikesForThisPost = cachedLikesMap?.get?.(Number(postId));

  const { likesMap, isLoading: likesLoading } = useGetLikesMap(
    "post",
    [Number(postId)],
    { enabled: !cachedLikesForThisPost }
  );

  const finalLikesMap = useMemo(() => {
    if (cachedLikesForThisPost) {
      const map = new Map();
      map.set(Number(postId), cachedLikesForThisPost);
      return map;
    }
    return likesMap;
  }, [cachedLikesForThisPost, likesMap, postId]);

  return { likesLoading, finalLikesMap };
}
