import PostActions from "../Post/PostActions";

function PostDetailsActions({ post }) {
  return (
    <div>
      <PostActions postId={post.id} showCounts={false} />
    </div>
  );
}

export default PostDetailsActions;
