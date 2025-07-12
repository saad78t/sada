import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDeleteComment, useGetComments } from "../../hooks/useComments";
import PostDetailsCommentsList from "./PostDetailsCommentsList";

function PostDetailsComments({ post }) {
  const [expandedComments, setExpandedComments] = useState({});
  const { mutate: deleteCommentMutate } = useDeleteComment();
  const { id } = useParams();

  const { comments, commentsLoading } = useGetComments(id);

  return (
    <div style={{ marginTop: "2rem" }}>
      {commentsLoading ? (
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
