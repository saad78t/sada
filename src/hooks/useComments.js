import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addComment,
  deleteComment,
  getComments,
} from "../services/commentService";
import toast from "react-hot-toast";

export function useAddComment(postId) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ content, parentId }) =>
      addComment(postId, content, parentId),
    onSuccess: () => {
      toast.success("Comment added successfully from hook💥💥💥💥💥💥");
      queryClient.invalidateQueries(["comments", postId]);
    },
    onError: (err) => toast.error(err.message),
  });

  return mutation;
}

export function useDeleteComment() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      toast.success("Comment deleted successfully");
      queryClient.invalidateQueries(["comments"]);
    },
    onError: (err) => toast.error(err.message),
  });

  return mutation;
}

export function useGetComments(postId) {
  const { data: comments = [], isLoading: commentsLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
    enabled: !!postId,
  });
  return { comments, commentsLoading };
}
