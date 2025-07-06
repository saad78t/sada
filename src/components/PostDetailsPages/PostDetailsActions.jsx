import PostActions from "../Post/PostActions";

function PostDetailsActions({ post }) {
  return (
    <div>
      <PostActions postId={post.id} />
    </div>
  );
}

export default PostDetailsActions;
