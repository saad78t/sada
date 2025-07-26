import { useMemo, useState } from "react";
import { isThreadFullyDeleted } from "../utils/helpers";

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

export function useCommentPagination(comments) {
  const [visibleCount, setVisibleCount] = useState(3);

  const topLevelComments = useMemo(
    () =>
      comments.filter(
        (c) => !c.parent_comment_id && !isThreadFullyDeleted(c, comments)
      ),
    [comments]
  );

  const visibleTopLevelComments = useMemo(
    () => topLevelComments.slice(0, visibleCount),
    [topLevelComments, visibleCount]
  );

  return {
    topLevelComments,
    visibleTopLevelComments,
    visibleCount,
    setVisibleCount,
  };
}
