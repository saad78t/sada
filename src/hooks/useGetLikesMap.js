import { useQuery } from "@tanstack/react-query";
import { getLikesMap } from "../services/likeService";

// export function useGetLikesMap(targetType, targetIds = []) {
//   const { data: likesMap = new Map(), isLoading } = useQuery({
//     queryKey: ["likes-map", targetType, targetIds.sort().join(",")],
//     queryFn: () => getLikesMap(targetType, targetIds),
//     enabled: targetIds.length > 0,
//     refetchOnWindowFocus: false,
//     refetchOnMount: false,
//     staleTime: 60 * 1000,
//   });

//   return { likesMap, isLoading };
// }

export function useGetLikesMap(targetType, targetIds = [], options = {}) {
  const { data: likesMap = new Map(), isLoading } = useQuery({
    queryKey: ["likes-map", targetType, targetIds.sort().join(",")],
    queryFn: () => getLikesMap(targetType, targetIds),
    enabled: targetIds.length > 0 && options.enabled !== false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 60 * 1000,
  });

  return { likesMap, isLoading };
}
