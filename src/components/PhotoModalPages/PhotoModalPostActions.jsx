import PostActions from "../Post/PostActions";

function PhotoModalPostActions({ post, likesMap, likesLoading }) {
  return (
    <PostActions
      postId={post.id}
      likesMap={likesMap}
      likesLoading={likesLoading}
    />
  );
}

export default PhotoModalPostActions;
