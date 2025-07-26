import { useNavigate } from "react-router-dom";
import { MessageCircle, ThumbsUp } from "lucide-react";
import UserAvatar from "../Post/UserAvatar";
import CommentOptionsMenu from "../../Comment/CommentOptionsMenu";
import { formatCount, isThreadFullyDeleted } from "../../utils/helpers";
import { useGetLikesMap } from "../../hooks/useGetLikesMap";
import { useMemo } from "react";
import {
  CommentContainer,
  ActionButton,
  AuthorRow,
  CommentActions,
  CommentText,
  PostDate,
  UserName,
  CommentContent,
} from "./PostDetailsCommentItemStyles";
import { DeletedAvatar } from "../../Shared/DeletedAvater";

function PostDetailsCommentItem({
  post,
  comment,
  allComments,

  setExpandedComments,
  deleteCommentMutate,
}) {
  const navigate = useNavigate();

  const commentIds = useMemo(() => allComments.map((c) => c.id), [allComments]);
  const { likesMap, isLoading: likesLoading } = useGetLikesMap(
    "comment",
    commentIds
  );
  const likes = likesMap?.get?.(comment.id) || [];

  const toggleReplies = (commentId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleCommentClick = (commentId) => {
    navigate(`/comment/${commentId}?postId=${post.id}`);
  };

  const replies = allComments.filter((c) => c.parent_comment_id === comment.id);
  const isDeleted = comment.is_deleted;

  const isFullyDeleted = isThreadFullyDeleted(comment, allComments);

  if (isFullyDeleted) {
    return null;
  }

  return (
    <CommentContainer
      key={comment.id}
      onClick={() =>
        comment.parent_comment_id === null && handleCommentClick(comment.id)
      }
      style={{
        cursor: comment.parent_comment_id === null ? "pointer" : "default",
      }}
    >
      {isDeleted ? (
        <DeletedAvatar />
      ) : (
        <UserAvatar
          comment={comment}
          username={comment.users?.username}
          profilePictureUrl={comment.users?.profile_picture_url}
        />
      )}
      {isDeleted ? (
        <CommentContent $isDeleted={isDeleted}>
          <div style={{ paddingLeft: "10px" }}>
            <p style={{ fontStyle: "italic" }}>deleted comment 🗑️</p>
            {replies.length > 0 && (
              <CommentActions>
                <ActionButton>
                  <MessageCircle size={16} /> {formatCount(replies.length)}
                </ActionButton>
              </CommentActions>
            )}
          </div>
        </CommentContent>
      ) : (
        <CommentContent>
          <AuthorRow>
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "absolute",
                zIndex: 999,
                top: "10%",
                right: 0,
              }}
            >
              <CommentOptionsMenu
                onDelete={() => deleteCommentMutate(comment.id)}
                top="20px"
                optionTop="-10px"
              />
            </div>
            <UserName>{comment.users?.username}</UserName>
            <PostDate>
              • {new Date(comment.created_at).toLocaleString()}
            </PostDate>
          </AuthorRow>

          <CommentText content={comment.content}>{comment.content}</CommentText>

          <CommentActions>
            <ActionButton onClick={() => toggleReplies(comment.id)}>
              <MessageCircle size={16} />{" "}
              {replies.length ? formatCount(replies.length) : null}
            </ActionButton>
            <ActionButton>
              <ThumbsUp size={16} />{" "}
              {likesLoading ? "..." : likes.length > 0 ? likes.length : null}
            </ActionButton>
          </CommentActions>
        </CommentContent>
      )}
    </CommentContainer>
  );
}

export default PostDetailsCommentItem;
