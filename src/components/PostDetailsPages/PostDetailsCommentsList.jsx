import PostDetailsCommentItem from "./PostDetailsCommentItem";

function PostDetailsCommentsList({
  post,
  comments,
  expandedComments,
  setExpandedComments,
  deleteCommentMutate,
}) {
  return (
    <>
      {comments
        .filter((c) => c.parent_comment_id === null)
        .map((c) => (
          <PostDetailsCommentItem
            key={c.id}
            post={post}
            comment={c}
            allComments={comments}
            expandedComments={expandedComments}
            setExpandedComments={setExpandedComments}
            deleteCommentMutate={deleteCommentMutate}
          />
        ))}
    </>
  );
}

export default PostDetailsCommentsList;
