// import styled from "styled-components";
// import { getSizeByDepth, timeAgo } from "../utils/helpers";
// import CommentOptionsMenu from "./CommentOptionsMenu";
// import { useDeleteComment } from "../hooks/useComments";

// const HeaderRow = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between; /* يوزع النصوص والطرف الثاني */
//   margin-bottom: 0.25rem;
// `;

// const HeaderInfo = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.35rem; /* مسافة بين الاسم والتاريخ */
//   min-width: 0; /* يخلي النصوص تكسر صح إذا ضاق المكان */
// `;

// const Username = styled.span`
//   font-weight: bold;
//   font-size: ${({ $depth }) => getSizeByDepth($depth, "username")};
//   color: #1a1a1a;
//   white-space: nowrap; /* الاسم يظل على سطر واحد */
//   text-overflow: ellipsis;
//   overflow: hidden;
// `;

// const CommentDate = styled.span`
//   font-size: 0.8rem;
//   color: #65676b;
//   white-space: nowrap;
// `;

// function CommentHeader({ comment, depth }) {
//   // const queryClient = useQueryClient();

//   // const { mutate: deleteCommentMutate } = useMutation({
//   //   mutationFn: deleteComment,
//   //   onSuccess: () => {
//   //     toast.success("Comment deleted successfully"),
//   //       queryClient.invalidateQueries(["comments"]);
//   //   },
//   //   onError: (err) => toast.error(err.message),
//   // });
//   const { mutate: deleteCommentMutate } = useDeleteComment();
//   return (
//     <HeaderRow>
//       <HeaderInfo>
//         <Username $depth={depth}>{comment.users?.username}</Username>
//         <CommentDate>· {timeAgo(comment.created_at)}</CommentDate>
//       </HeaderInfo>
//       <CommentOptionsMenu onDelete={() => deleteCommentMutate(comment.id)} />
//     </HeaderRow>
//   );
// }

// export default CommentHeader;

import styled from "styled-components";
import { getSizeByDepth, timeAgo } from "../utils/helpers";
import CommentOptionsMenu from "./CommentOptionsMenu";
import { useDeleteComment } from "../hooks/useComments";

const HeaderRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between; /* (اسم+تاريخ) طرف / المنيو الطرف الثاني */
  margin-bottom: 0.25rem;
  min-width: 0; /* حتى يلف الاسم */
`;

const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem; /* مسافة صغيرة بين الاسم والتاريخ */
  min-width: 0;
`;

const Username = styled.span`
  font-weight: bold;
  font-size: ${({ $depth }) => getSizeByDepth($depth, "username")};
  color: #1a1a1a;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis; /* إذا الاسم طويل جدًا */
  white-space: nowrap; /* خليه سطر واحد مثل فيسبوك */
`;

const CommentDate = styled.span`
  font-size: 0.8rem;
  color: #65676b;
  white-space: nowrap;
`;

function CommentHeader({ comment, depth }) {
  const { mutate: deleteCommentMutate } = useDeleteComment();

  return (
    <HeaderRow>
      <HeaderInfo>
        <Username $depth={depth}>{comment.users?.username}</Username>
        <CommentDate>· {timeAgo(comment.created_at)}</CommentDate>
      </HeaderInfo>

      <CommentOptionsMenu onDelete={() => deleteCommentMutate(comment.id)} />
    </HeaderRow>
  );
}

export default CommentHeader;
