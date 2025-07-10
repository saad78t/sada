import styled from "styled-components";
import ReplyForm from "../../Comment/ReplyForm";
import { useAddComment } from "../../hooks/useComments";
import { FaPaperPlane } from "react-icons/fa";

const ReplyFormStyled = styled(ReplyForm)`
  position: fixed;
  bottom: -20px;
  right: 20px;
  width: 400px;
  max-width: 90%;
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  z-index: 1001;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  textarea {
    width: 100%;
    min-height: 60px;
    border-radius: 4px;
    padding: 0.5rem;
    font-size: 1rem;
  }

  button {
    position: absolute;
    bottom: 0.5rem;
    right: 2rem;
    background-color: #1d9bf0;
    color: white;
    border: none;
    padding: 0.4rem 0.7rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    cursor: pointer;
  }
`;

function PhotoModalReplyForm({ post }) {
  const { mutate } = useAddComment(post.id);

  return (
    <ReplyFormStyled
      onSubmit={(content) =>
        mutate({
          postId: post.id,
          content,
        })
      }
      placeholder="Add a comment..."
      buttonText={<FaPaperPlane />}
    />
  );
}

export default PhotoModalReplyForm;
