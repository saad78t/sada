import styled from "styled-components";
import { timeAgo } from "../utils/helpers";
import CommentOptionsMenu from "./CommentOptionsMenu";
import { useDeleteComment } from "../hooks/useComments";

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
`;

const Username = styled.span`
  font-weight: bold;
  color: #1a1a1a;
`;

const CommentDate = styled.span`
  font-size: 0.8rem;
  color: #65676b;
`;

function CommentHeader({ comment }) {
  // const queryClient = useQueryClient();

  // const { mutate: deleteCommentMutate } = useMutation({
  //   mutationFn: deleteComment,
  //   onSuccess: () => {
  //     toast.success("Comment deleted successfully"),
  //       queryClient.invalidateQueries(["comments"]);
  //   },
  //   onError: (err) => toast.error(err.message),
  // });
  const { mutate: deleteCommentMutate } = useDeleteComment();
  return (
    <HeaderRow>
      <Username>{comment.users?.username}</Username>
      <CommentDate>· {timeAgo(comment.created_at)}</CommentDate>
      <CommentOptionsMenu onDelete={() => deleteCommentMutate(comment.id)} />
    </HeaderRow>
  );
}

export default CommentHeader;
