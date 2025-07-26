import PostDetailsCommentItem from "./PostDetailsCommentItem";
import { useCommentPagination } from "../../hooks/useCommentPagination";
import Button from "../../Shared/Button";
import styled from "styled-components";

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

function PostDetailsCommentsList({
  post,
  comments,
  expandedComments,
  setExpandedComments,
  deleteCommentMutate,
}) {
  const {
    topLevelComments,
    visibleTopLevelComments,
    visibleCount,
    setVisibleCount,
  } = useCommentPagination(comments);

  return (
    <>
      {visibleTopLevelComments.map((c) => (
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

      {topLevelComments.length > visibleCount && (
        <LoadMoreButton onClick={() => setVisibleCount((prev) => prev + 10)}>
          Load more comments
        </LoadMoreButton>
      )}
    </>
  );
}

export default PostDetailsCommentsList;
