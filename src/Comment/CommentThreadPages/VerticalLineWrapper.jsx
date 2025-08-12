// import styled from "styled-components";
// import { timeAgo } from "../../utils/helpers";
// import PostHeader from "../../components/Post/PostHeader";
// import PostContent from "../../components/Post/PostContent";
// import PostDetailsMedia from "../../components/PostDetailsPages/PostDetailsMedia";

// const VerticalLineWrapperGray = styled.div`
//   position: relative;
//   display: flex;
//   flex-direction: column;

//   &::before {
//     content: "";
//     position: absolute;
//     left: 1.25rem;
//     top: 40px;
//     height: calc(100% - 48px - 40px - 1.5rem - 1rem);
//     /* height: calc(var(--main-comment-top, 430px) - 56px); */
//     width: 2px;
//     background: ${({ theme }) => theme.borderColor || "#ccc"};
//     z-index: 0;
//   }
// `;

// const MediaWrapper = styled.div`
//   padding-left: 3rem;
//   box-sizing: border-box;
// `;

// function VerticalLineWrapper({ post, renderComment, mainComment }) {
//   return (
//     <VerticalLineWrapperGray>
//       <PostHeader
//         username={post.users?.username}
//         avatarUrl={post.users?.profile_picture_url}
//         createdAt={timeAgo(post.created_at)}
//         postId={post.id}
//       />
//       <PostContent content={post.content} />
//       <MediaWrapper>
//         <PostDetailsMedia mediaUrls={post.media_urls} />
//       </MediaWrapper>
//       {renderComment(mainComment)}
//     </VerticalLineWrapperGray>
//   );
// }

// export default VerticalLineWrapper;

import styled from "styled-components";
import { timeAgo } from "../../utils/helpers";
import PostHeader from "../../components/Post/PostHeader";
import PostContent from "../../components/Post/PostContent";
import PostDetailsMedia from "../../components/PostDetailsPages/PostDetailsMedia";

const VerticalLineWrapperGray = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  &::before {
    content: "";
    position: absolute;
    left: 1.25rem;
    top: 40px;
    height: calc(100% - 48px - 40px - 1.5rem - 1rem);
    width: 2px;
    background: ${({ theme }) => theme.borderColor || "#ccc"};
    z-index: 0;
  }
`;

const MediaWrapper = styled.div`
  padding-left: 3rem;
  box-sizing: border-box;
`;

function VerticalLineWrapper({
  post,
  // eslint-disable-next-line no-unused-vars
  RenderComment,
  mainComment,
  commentId,
  repliesMap,
  openReplies,
  setReplyingTo,
  setOpenReplies,
  deleteCommentMutate,
}) {
  return (
    <VerticalLineWrapperGray>
      <PostHeader
        username={post.users?.username}
        avatarUrl={post.users?.profile_picture_url}
        createdAt={timeAgo(post.created_at)}
        postId={post.id}
      />
      <PostContent content={post.content} />
      <MediaWrapper>
        <PostDetailsMedia mediaUrls={post.media_urls} />
      </MediaWrapper>
      <RenderComment
        comment={mainComment}
        commentId={commentId}
        repliesMap={repliesMap}
        openReplies={openReplies}
        setReplyingTo={setReplyingTo}
        setOpenReplies={setOpenReplies}
        deleteCommentMutate={deleteCommentMutate}
      />
    </VerticalLineWrapperGray>
  );
}

export default VerticalLineWrapper;
