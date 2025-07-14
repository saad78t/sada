import styled from "styled-components";
import { useParams, useLocation } from "react-router-dom";
import Spinner from "../Shared/Spinner";
import UserAvatar from "../components/Post/UserAvatar";
import { useState } from "react";
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

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const RepliesWrapper = styled.div`
  margin-left: 0.1rem;
  margin-top: 1.5rem;
`;

const CommentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  position: relative;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.borderColor || "#ddd"};
  }
`;

const CommentContent = styled.div`
  flex: 1;
`;

const FixedReplyFormWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 700px;
  padding: 0.75rem 0.5rem;
  background: #f9f9f9;
  border-top: 1px solid #ddd;
  z-index: 9999;
`;

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

  if (isLoading || commentsLoading) return <Spinner />;

  const mainComment = comments.find((c) => c.id === Number(commentId));
  const replies = comments.filter(
    (c) => c.parent_comment_id === Number(commentId)
  );

  if (!mainComment) return <p>Comment not found.</p>;

  const handleAddComment = (content) => {
    addCommentMutate({
      content,
      parentId: replyingTo,
    });
    setReplyingTo(null);
  };

  const renderComment = (comment) => {
    const nestedReplies = comments.filter(
      (c) => c.parent_comment_id === comment.id
    );
    const showReplies = openReplies[comment.id];

    return (
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
        <RepliesList replies={replies} renderComment={renderComment} />
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
