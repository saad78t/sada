import CommentItem from "../../Comment/CommentItem";
import PhotoModalReplyForm from "./PhotoModalReplyForm";
import { useGetComments } from "../../hooks/useComments";

function PhotoModalCommentsList({ post }) {
  const { comments } = useGetComments(post.id);

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
