import { timeAgo } from "../../utils/helpers";
import PostHeader from "../Post/PostHeader";

function PhotoModalPostHeader({ post }) {
  return (
    <PostHeader
      username={post.users?.username || post.username}
      avatarUrl={post.users?.profile_picture_url}
      createdAt={timeAgo(post.created_at)}
      postId={post.id}
    />
  );
}

export default PhotoModalPostHeader;
