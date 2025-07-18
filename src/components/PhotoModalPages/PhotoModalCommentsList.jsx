import CommentItem from "../../Comment/CommentItem";
import PhotoModalReplyForm from "./PhotoModalReplyForm";
import { useGetComments } from "../../hooks/useComments";
import { useMemo } from "react";

function PhotoModalCommentsList({ post }) {
  const { comments } = useGetComments(post.id);

  //  Used a Map to build repliesMap once instead of filtering for each comment — improves performance for large comment trees and keeps parent-child relationships organized.
  const repliesMap = useMemo(() => {
    const map = new Map();
    comments.forEach((comment) => {
      const parentId = comment.parent_comment_id;
      if (!parentId) return;
      if (!map.has(parentId)) {
        map.set(parentId, []);
      }
      map.get(parentId).push(comment);
    });
    return map;
  }, [comments]);

  return (
    <>
      <div style={{ marginTop: "1rem" }}>
        {comments.map((comment) =>
          !comment.parent_comment_id ? (
            <CommentItem
              key={comment.id}
              comment={comment}
              comments={comments}
              repliesMap={repliesMap}
            />
          ) : null
        )}
      </div>

      <PhotoModalReplyForm post={post} />
    </>
  );
}

export default PhotoModalCommentsList;
