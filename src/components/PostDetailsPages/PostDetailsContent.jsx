import React from "react";
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

export default React.memo(PostDetailsContent); //To prevent the video from restarting from the beginning when adding a comment, as when adding a comment a component rendering problem occurred.
