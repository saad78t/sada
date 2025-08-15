import { useNavigate } from "react-router-dom";
import Spinner from "../Shared/Spinner";
import { useEffect, useMemo } from "react";
import { usePost } from "../hooks/usePost";
import { useAddComment } from "../hooks/useComments";
import { IoSendSharp, IoCloseSharp } from "react-icons/io5";
import BackButton from "./CommentThreadPages/BackButton";
import VerticalLineWrapper from "./CommentThreadPages/VerticalLineWrapper";
import RepliesList from "./CommentThreadPages/RepliesList";
import ReplyFormStyled from "./CommentThreadPages/ReplyFormStyled";
import {
  Container,
  FixedReplyFormWrapper,
} from "./CommentThreadPages/CommentThreadStyles";
import { isThreadFullyDeleted } from "../utils/helpers";
import RenderComment from "./CommentThreadPages/RenderComment";
import { useThreadContext } from "./CommentThreadPages/CommentThreadContext";

const CommentThread = () => {
  const {
    replyingTo,
    setReplyingTo,
    repliesMap,
    postId,
    comments,
    commentsLoading,
    commentId,
  } = useThreadContext();

  const { post, isLoading } = usePost(postId);
  const { mutate: addCommentMutate } = useAddComment(postId);
  const navigate = useNavigate();

  const visibleReplies = useMemo(() => {
    const repliesList = repliesMap?.get(Number(commentId)) ?? [];
    return repliesList?.filter(
      (reply) => !isThreadFullyDeleted(reply, repliesMap)
    );
  }, [commentId, repliesMap]);

  const mainComment = comments.find((c) => c.id === Number(commentId));

  // Redirecting to post page if there are no visible replies.
  // This navigation is placed inside useEffect to avoid triggering
  // a state update during rendering, which causes a React warning.
  // See: https://react.dev/link/setstate-in-render
  useEffect(() => {
    const isMainCommentDeleted = isThreadFullyDeleted(mainComment, repliesMap);

    if (
      !commentsLoading &&
      !isLoading &&
      visibleReplies?.length === 0 &&
      isMainCommentDeleted
    ) {
      navigate(`/post/${postId}`);
    }
  }, [
    commentsLoading,
    isLoading,
    visibleReplies,
    postId,
    navigate,
    mainComment,
    repliesMap,
  ]);

  if (isLoading || commentsLoading) return <Spinner />;
  if (!mainComment) return <p>Comment not found.</p>;

  const handleAddComment = (content) => {
    addCommentMutate({
      content,
      parentId: replyingTo,
    });
    setReplyingTo(null);
  };

  return (
    <>
      <Container>
        <BackButton postId={postId} />
        <VerticalLineWrapper
          post={post}
          RenderComment={RenderComment}
          mainComment={mainComment}
        />

        <RepliesList replies={visibleReplies} RenderComment={RenderComment} />
      </Container>

      {replyingTo && (
        <FixedReplyFormWrapper>
          <ReplyFormStyled
            onSubmit={handleAddComment}
            onCancel={() => {
              setReplyingTo(null);
            }}
            cancelText={<IoCloseSharp />}
            buttonText={<IoSendSharp />}
            placeholder="Post your reply..."
          />
        </FixedReplyFormWrapper>
      )}
    </>
  );
};

export default CommentThread;
