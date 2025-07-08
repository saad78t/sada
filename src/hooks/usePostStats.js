import { useQuery } from "@tanstack/react-query";
import { getLikes } from "../services/likeService";
import { getComments } from "../services/commentService";

export function usePostStatus(postId) {
  const { data: likes = [], isLoading: likesLoading } = useQuery({
    queryKey: ["likes", postId],
    queryFn: () => getLikes(postId),
  });

  const { data: comments = [], isLoading: commentsLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
  });

  return {
    likes,
    likesLoading,
    comments,
    commentsLoading,
  };
}
