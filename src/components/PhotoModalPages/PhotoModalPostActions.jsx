import PostActions from "../Post/PostActions";

function PhotoModalPostActions({ post }) {
  return <PostActions postId={post.id} />;
}

export default PhotoModalPostActions;
