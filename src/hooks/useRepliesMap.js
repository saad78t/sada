import { useMemo } from "react";

export function useReplieceMap(comments) {
  return useMemo(() => {
    const map = new Map();
    comments.forEach((comment) => {
      const parentId = comment.parent_comment_id;
      if (!map.has(parentId)) {
        map.set(parentId, []);
      }
      map.get(parentId).push(comment);
    });
    return map;
  }, [comments]);
}
