import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, deletePost, getPostById } from "../services/postService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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

export function useDeletePost() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success("Post successfully deleted 💥");
      navigate("/");
      queryClient.invalidateQueries({
        queryKey: ["Posts"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, mutate };
}

export function useCreatePost() {
  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      toast.success("Post successfully created");
    },
    onError: (err) => {
      console.error("Error creating post:", err),
        toast.error(err.message || "❌ Failed to create post");
    },
  });

  return { mutate, isPending };
}
