// import styled from "styled-components";

// const RepliesWrapper = styled.div`
//   margin-left: 3rem;
// `;

// function RepliesList({ replies, renderComment }) {
//   return (
//     <div>
//       {replies?.length > 0 && (
//         <RepliesWrapper>
//           {replies.map((reply) => renderComment(reply))}
//         </RepliesWrapper>
//       )}
//     </div>
//   );
// }

// export default RepliesList;

import styled from "styled-components";

const RepliesWrapper = styled.div`
  margin-left: 3rem;
`;

function RepliesList({
  replies,
  // eslint-disable-next-line no-unused-vars
  RenderComment,
  commentId,
  repliesMap,
  openReplies,
  setReplyingTo,
  setOpenReplies,
  deleteCommentMutate,
}) {
  return (
    <div>
      {replies?.length > 0 && (
        <RepliesWrapper>
          {replies.map((reply) => (
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
    </div>
  );
}

export default RepliesList;
