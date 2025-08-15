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
  showReplies,
  // eslint-disable-next-line no-unused-vars
  RenderComment,
}) {
  return (
    <CommentContainer>
      <DeletedAvatar />
      <CommentContent>
        <p style={{ fontStyle: "italic", marginTop: "10px" }}>
          deleted comment 🗑️
        </p>

        {nestedReplies.length > 0 && (
          <CommentActions
            comment={comment}
            nestedReplies={nestedReplies}
            hideLikeButton
          />
        )}
        {showReplies && (
          <RepliesWrapper>
            {nestedReplies.map((reply) => (
              <RenderComment key={reply.id} comment={reply} />
            ))}
          </RepliesWrapper>
        )}
      </CommentContent>
    </CommentContainer>
  );
}

export default DeletedComment;
