import React from "react";
import { isThreadFullyDeleted } from "../../utils/helpers";
import DeletedComment from "./DeletedComment";
import {
  CommentContainer,
  CommentContent,
  RepliesWrapper,
} from "./CommentThreadStyles";
import UserAvatar from "../../components/Post/UserAvatar";
import CommentHeader from "./CommentHeader";
import CommentContentText from "./CommentContentText";
import CommentActions from "./CommentActions";
import CommentOptionsMenu from "../CommentOptionsMenu";

function RenderComment({
  comment,
  commentId,
  setReplyingTo,
  repliesMap,
  openReplies,
  setOpenReplies,
  deleteCommentMutate,
}) {
  const nestedReplies = repliesMap?.get(comment.id) || [];

  const showReplies = openReplies?.[comment?.id];

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
        RenderComment={RenderComment}
        repliesMap={repliesMap} // مررت هذا لـ DeletedComment
        openReplies={openReplies} // مررت هذا لـ DeletedComment
        deleteCommentMutate={deleteCommentMutate} // مررت هذا لـ DeletedComment
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
            {nestedReplies.map((reply) => (
              <RenderComment
                key={reply.id}
                comment={reply}
                commentId={commentId}
                repliesMap={repliesMap}
                openReplies={openReplies}
                setReplyingTo={setReplyingTo}
                setOpenReplies={setOpenReplies}
                deleteCommentMutate={deleteCommentMutate}
              />
            ))}
          </RepliesWrapper>
        )}
      </CommentContent>
    </CommentContainer>
  );
}

export default RenderComment;
