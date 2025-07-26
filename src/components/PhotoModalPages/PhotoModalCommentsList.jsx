import CommentItem from "../../Comment/CommentItem";
import PhotoModalReplyForm from "./PhotoModalReplyForm";
import { useGetComments } from "../../hooks/useComments";
import { useMemo } from "react";
import styled from "styled-components";
import { useCommentPagination } from "../../hooks/useCommentPagination";
import Button from "../../Shared/Button";

const LoadMoreButton = styled(Button)`
  display: block;
  margin: 1rem auto 2rem;
  padding: 0.5rem 1.5rem;

  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;
`;

function PhotoModalCommentsList({ post }) {
  const { comments } = useGetComments(post.id);

  const {
    topLevelComments,
    visibleTopLevelComments,
    visibleCount,
    setVisibleCount,
  } = useCommentPagination(comments);

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
        {visibleTopLevelComments.map((comment) =>
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

      {topLevelComments.length > visibleCount && (
        <LoadMoreButton onClick={() => setVisibleCount((prev) => prev + 10)}>
          Load more comments
        </LoadMoreButton>
      )}
      <PhotoModalReplyForm post={post} />
    </>
  );
}

export default PhotoModalCommentsList;
