import PostDetailsMedia from "./PostDetailsMedia";

function PostDetailsContent({ post }) {
  return (
    <div>
      {post.content}
      <PostDetailsMedia mediaUrls={post.media_urls} />
    </div>
  );
}

export default PostDetailsContent;
