import { useThreadContext } from "./CommentThreadContext";
import { useDeleteComment } from "../../hooks/useComments";
import { isThreadFullyDeleted } from "../../utils/helpers";
import DeletedComment from "./DeletedComment";
import UserAvatar from "../../components/Post/UserAvatar";
import CommentHeader from "./CommentHeader";
import CommentContentText from "./CommentContentText";
import CommentActions from "./CommentActions";
import CommentOptionsMenu from "../CommentOptionsMenu";
import {
  CommentContainer,
  CommentContent,
  RepliesWrapper,
} from "./CommentThreadStyles";

function RenderComment({ comment, depth = 0 }) {
  const { openReplies, repliesMap } = useThreadContext();
  const { mutate: deleteComment } = useDeleteComment();

  const nestedReplies = repliesMap?.get(comment.id) || [];
  const showReplies = openReplies?.[comment.id];

  // إذا التعليق محذوف وكل ردوده محذوفة أو ماكو ردود → ما نعرضه
  if (isThreadFullyDeleted(comment, repliesMap) && nestedReplies.length === 0)
    return null;

  if (comment.is_deleted) {
    return (
      <DeletedComment
        comment={comment}
        nestedReplies={nestedReplies}
        showReplies={showReplies}
      />
    );
  }

  return (
    <CommentContainer>
      <UserAvatar
        depth={depth}
        username={comment.users?.username}
        profilePictureUrl={comment.users?.profile_picture_url}
      />
      <CommentOptionsMenu
        onDelete={() => deleteComment(comment.id)}
        top="20px"
        optionTop="-10px"
      />
      <CommentContent>
        <CommentHeader comment={comment} />
        <CommentContentText comment={comment} />
        <CommentActions comment={comment} nestedReplies={nestedReplies} />
        {showReplies && (
          <RepliesWrapper>
            {nestedReplies
              .filter((r) => !isThreadFullyDeleted(r, repliesMap))
              .map((r) => (
                <RenderComment key={r.id} comment={r} depth={depth + 1} />
              ))}
          </RepliesWrapper>
        )}
      </CommentContent>
    </CommentContainer>
  );
}

export default RenderComment;
