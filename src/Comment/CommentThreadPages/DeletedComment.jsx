import { DeletedAvatar } from "../../Shared/DeletedAvater";
import CommentActions from "./CommentActions";
import {
  CommentContainer,
  CommentContent,
  RepliesWrapper,
} from "./CommentThreadStyles";

function DeletedComment({
  nestedReplies,
  comment,
  commentId,
  setReplyingTo,
  setOpenReplies,
  showReplies,
  renderComment,
}) {
  return (
    <CommentContainer>
      <DeletedAvatar />
      <CommentContent>
        <p style={{ fontStyle: "italic", marginTop: " 10px" }}>
          {" "}
          deleted comment 🗑️
        </p>

        {nestedReplies.length > 0 && (
          <CommentActions
            comment={comment}
            commentId={commentId}
            setReplyingTo={setReplyingTo}
            setOpenReplies={setOpenReplies}
            nestedReplies={nestedReplies}
            hideLikeButton
          />
        )}
        {showReplies && (
          <RepliesWrapper>
            {nestedReplies.map((reply) => renderComment(reply))}
          </RepliesWrapper>
        )}
      </CommentContent>
    </CommentContainer>
  );
}

export default DeletedComment;
