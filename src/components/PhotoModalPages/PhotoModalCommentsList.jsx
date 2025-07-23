import CommentItem from "../../Comment/CommentItem";
import PhotoModalReplyForm from "./PhotoModalReplyForm";
import { useGetComments } from "../../hooks/useComments";
import { useMemo, useState } from "react";
import styled from "styled-components";

const LoadMoreButton = styled.button`
  display: block;
  margin: 1rem auto 2rem;
  padding: 0.5rem 1.5rem;
  background-color: #f0f0f0;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e0e0e0;
  }
`;

// ✅ Why we implemented comment pagination (visibleCount):
//
// In large posts, it's common to have dozens or even hundreds of top-level comments.
// Rendering them all at once can:
// - Slow down performance (especially on mobile)
// - Trigger fetching likes for *all* comments at once (e.g. 100+ IDs in one go)
//
// So instead of rendering all comments immediately,
// we show only the first [visibleCount] comments,
// and display a "Load more comments" button to fetch the rest progressively.
//
// This improves performance, keeps the UI clean, and avoids unnecessary queries.
//
// Example:
// Instead of rendering 100 comments at once:
// const visible = comments.slice(0, visibleCount);
// Only show 10–30, and load more when the user clicks.

function PhotoModalCommentsList({ post }) {
  const { comments } = useGetComments(post.id);
  const [visibleCount, setVisibleCount] = useState(3);

  const topLevelComments = useMemo(
    () => comments.filter((c) => !c.parent_comment_id),
    [comments]
  );

  const visibleTopLevelComments = useMemo(
    () => topLevelComments.slice(0, visibleCount),
    [topLevelComments, visibleCount]
  );

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
