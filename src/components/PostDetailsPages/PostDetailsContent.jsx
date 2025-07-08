import PostContent from "../Post/PostContent";
import PostDetailsMedia from "./PostDetailsMedia";

function PostDetailsContent({ post }) {
  return (
    <div>
      <PostContent content={post.content} />
      <PostDetailsMedia mediaUrls={post.media_urls} />
    </div>
  );
}

export default PostDetailsContent;
