/* import { useParams, useLocation, useNavigate } from "react-router-dom";
import Spinner from "../Shared/Spinner";
import UserAvatar from "../components/Post/UserAvatar";
import React, { useEffect, useMemo, useState } from "react";
import { usePost } from "../hooks/usePost";
import {
  useAddComment,
  useDeleteComment,
  useGetComments,
} from "../hooks/useComments";
import { IoSendSharp, IoCloseSharp } from "react-icons/io5";
import CommentOptionsMenu from "./CommentOptionsMenu";
import BackButton from "./CommentThreadPages/BackButton";
import VerticalLineWrapper from "./CommentThreadPages/VerticalLineWrapper";
import CommentHeader from "./CommentThreadPages/CommentHeader";
import CommentContentText from "./CommentThreadPages/CommentContentText";
import CommentActions from "./CommentThreadPages/CommentActions";
import RepliesList from "./CommentThreadPages/RepliesList";
import ReplyFormStyled from "./CommentThreadPages/ReplyFormStyled";
import { useReplieceMap } from "../hooks/useRepliesMap";
import DeletedComment from "./CommentThreadPages/DeletedComment";
import {
  CommentContainer,
  CommentContent,
  Container,
  FixedReplyFormWrapper,
  RepliesWrapper,
} from "./CommentThreadPages/CommentThreadStyles";
import { isThreadFullyDeleted } from "../utils/helpers";

const CommentThread = () => {
  const { commentId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const postId = queryParams.get("postId");
  const [replyingTo, setReplyingTo] = useState(null);
  const [openReplies, setOpenReplies] = useState({});

  const { post, isLoading } = usePost(postId);
  const { comments, commentsLoading } = useGetComments(postId);
  const { mutate: addCommentMutate } = useAddComment(postId);
  const { mutate: deleteCommentMutate } = useDeleteComment();
  const navigate = useNavigate();
  const repliesMap = useReplieceMap(comments);

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

  const renderComment = (comment) => {
    const nestedReplies = repliesMap?.get(comment.id) || [];

    const showReplies = openReplies[comment.id];

    const isFullyDeleted = isThreadFullyDeleted(comment, repliesMap);

    if (isFullyDeleted && (repliesMap?.get(comment.id)?.length ?? 0) === 0) {
      return null;
    }

    return comment.is_deleted ? (
      <React.Fragment key={comment.id}>
        <DeletedComment
          nestedReplies={nestedReplies}
          comment={comment}
          commentId={commentId}
          setReplyingTo={setReplyingTo}
          setOpenReplies={setOpenReplies}
          showReplies={showReplies}
          renderComment={renderComment}
        />
      </React.Fragment>
    ) : (
      <CommentContainer key={comment.id}>
        <UserAvatar
          username={comment.users?.username}
          profilePictureUrl={comment.users?.profile_picture_url}
        />
        <CommentOptionsMenu
          onDelete={() => deleteCommentMutate(comment.id)}
          top="20px"
          optionTop="-10px"
        />
        <CommentContent>
          <CommentHeader comment={comment} />
          <CommentContentText comment={comment} setReplyingTo={setReplyingTo} />
          <CommentActions
            comment={comment}
            commentId={commentId}
            setReplyingTo={setReplyingTo}
            setOpenReplies={setOpenReplies}
            nestedReplies={nestedReplies}
          />

          {showReplies && (
            <RepliesWrapper>
              {nestedReplies.map((reply) => renderComment(reply))}
            </RepliesWrapper>
          )}
        </CommentContent>
      </CommentContainer>
    );
  };

  return (
    <>
      <Container>
        <BackButton postId={postId} />
        <VerticalLineWrapper
          post={post}
          renderComment={renderComment}
          mainComment={mainComment}
        />
        <RepliesList replies={visibleReplies} renderComment={renderComment} />
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
 */

import { useParams, useLocation, useNavigate } from "react-router-dom";
import Spinner from "../Shared/Spinner";
import { useEffect, useMemo, useState } from "react";
import { usePost } from "../hooks/usePost";
import {
  useAddComment,
  useDeleteComment,
  useGetComments,
} from "../hooks/useComments";
import { IoSendSharp, IoCloseSharp } from "react-icons/io5";
import BackButton from "./CommentThreadPages/BackButton";
import VerticalLineWrapper from "./CommentThreadPages/VerticalLineWrapper";
import RepliesList from "./CommentThreadPages/RepliesList";
import ReplyFormStyled from "./CommentThreadPages/ReplyFormStyled";
import { useReplieceMap } from "../hooks/useRepliesMap";
import {
  Container,
  FixedReplyFormWrapper,
} from "./CommentThreadPages/CommentThreadStyles";
import { isThreadFullyDeleted } from "../utils/helpers";
import RenderComment from "./CommentThreadPages/RenderComment";

const CommentThread = () => {
  const { commentId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const postId = queryParams.get("postId");
  const [replyingTo, setReplyingTo] = useState(null);
  const [openReplies, setOpenReplies] = useState({});

  const { post, isLoading } = usePost(postId);
  const { comments, commentsLoading } = useGetComments(postId);
  const { mutate: addCommentMutate } = useAddComment(postId);
  const { mutate: deleteCommentMutate } = useDeleteComment();
  const navigate = useNavigate();
  const repliesMap = useReplieceMap(comments);

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
          commentId={commentId}
          repliesMap={repliesMap}
          openReplies={openReplies}
          setReplyingTo={setReplyingTo}
          setOpenReplies={setOpenReplies}
          deleteCommentMutate={deleteCommentMutate}
        />

        <RepliesList
          replies={visibleReplies}
          RenderComment={RenderComment}
          commentId={commentId}
          repliesMap={repliesMap}
          openReplies={openReplies}
          setReplyingTo={setReplyingTo}
          setOpenReplies={setOpenReplies}
          deleteCommentMutate={deleteCommentMutate}
        />
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
