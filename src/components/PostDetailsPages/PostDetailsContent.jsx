import PostContent from "../Post/PostContent";

function PostDetailsContent({ post }) {
  return (
    <div>
      <PostContent
        content={post.content}
        mediaUrls={post.media_urls}
        postId={post.id}
      />
    </div>
  );
}

export default PostDetailsContent;
