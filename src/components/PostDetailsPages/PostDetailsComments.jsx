import { useParams } from "react-router-dom";
import { getComments } from "../../services/commentService";
import { useState } from "react";
import { useDeleteComment } from "../../hooks/useComments";
import { useQuery } from "@tanstack/react-query";
import PostDetailsCommentsList from "./PostDetailsCommentsList";

function PostDetailsComments({ post }) {
  const [expandedComments, setExpandedComments] = useState({});
  const { mutate: deleteCommentMutate } = useDeleteComment();
  const { id } = useParams();

  const { data: comments = [], isLoading: loadingComments } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getComments(id),
  });

  return (
    <div style={{ marginTop: "2rem" }}>
      {loadingComments ? (
        <p>Loading comments...</p>
      ) : (
        <PostDetailsCommentsList
          post={post}
          comments={comments}
          expandedComments={expandedComments}
          setExpandedComments={setExpandedComments}
          deleteCommentMutate={deleteCommentMutate}
        />
      )}
    </div>
  );
}

export default PostDetailsComments;
