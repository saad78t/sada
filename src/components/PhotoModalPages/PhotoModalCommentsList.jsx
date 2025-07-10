import { useQuery } from "@tanstack/react-query";
import CommentItem from "../../Comment/CommentItem";
import { getComments } from "../../services/commentService";
import PhotoModalReplyForm from "./PhotoModalReplyForm";

function PhotoModalCommentsList({ post }) {
  const { data: comments = [] } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => getComments(post.id),
    enabled: !!post.id,
  });

  return (
    <>
      <div style={{ marginTop: "1rem" }}>
        {comments.map((comment) =>
          !comment.parent_comment_id ? (
            <CommentItem
              key={comment.id}
              comment={comment}
              comments={comments}
            />
          ) : null
        )}
      </div>

      <PhotoModalReplyForm post={post} />
    </>
  );
}

export default PhotoModalCommentsList;
