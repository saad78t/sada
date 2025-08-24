// import { useState, useRef, useMemo } from "react";
// import styled from "styled-components";
// import UserAvatar from "../components/Post/UserAvatar";
// import TreeLineSVG from "./TreeLineSVG";
// import { IoSendSharp } from "react-icons/io5";
// import CommentActions from "./CommentActions";
// import CommentHeader from "./CommentHeader";
// import { useAddComment } from "../hooks/useComments";
// import CommentContainer from "./CommentItemParts/CommentContainer";
// import ReplyFormStyled from "./CommentItemParts/ReplyFormStyledWrapper";
// import ReplyViewButton from "./CommentItemParts/ReplyViewButton";
// import RepliesContainer from "./CommentItemParts/RepliesContainer";
// import useReplyTreeLayout from "./CommentItemParts/useReplyTreeLayout";
// import { getSizeByDepth, isThreadFullyDeleted } from "../utils/helpers";
// import { DeletedAvatar } from "../Shared/DeletedAvater";

// const CommentBody = styled.div`
//   flex: 1;
// `;

// const CommentText = styled.p`
//   margin: 4px 0;
//   line-height: 1.4;
//   direction: ${({ $lang }) => ($lang === "ar" ? "rtl" : "ltr")};
//   font-size: ${({ $depth }) => getSizeByDepth($depth, "commentitemtext")};
//   word-break: break-word;
//   overflow-wrap: anywhere;
// `;

// const CommentItem = ({ comment, comments, repliesMap, depth = 0 }) => {
//   const [showReplies, setShowReplies] = useState(false);
//   const [replying, setReplying] = useState(false);
//   const [containerHeight, setContainerHeight] = useState(0);
//   const [branchPositions, setBranchPositions] = useState([]);
//   const containerRef = useRef(null);
//   const replyRefs = useRef([]);

//   /*
//   * Used a Map to build repliesMap once instead of filtering for each comment — improves performance for large comment trees and keeps parent-child relationships organized.
//   * Map was used in the parent PhotoModalCommentsList component instead of this line to avoid duplication every time we get replies using the filter function.
//   const replies = comments?.filter((c) => c.parent_comment_id === comment.id);
//   */

//   const lang = /[\u0600-\u06FF]/.test(comment.content) ? "ar" : "en";
//   const { mutate: addCommentMutate } = useAddComment(comment.post_id);

//   // خزنت نتيجة الفنكشن لتجنب حسابها أكثر من مرة وتحسين الأداء والوضوح.
//   const isFullyDeleted = isThreadFullyDeleted(comment, repliesMap);

//   // فلترة الردود لعرض الردود الغير محذوفة أو اللي عندها ردود غير محذوفة
//   const visibleReplies = useMemo(() => {
//     //Give me all replies to this current comment (comment.id). If there are no replies (i.e. undefined), return an empty array instead of returning undefined and ruining the job.
//     const replies = repliesMap.get(comment.id) || [];
//     return replies.filter((reply) => !isThreadFullyDeleted(reply, repliesMap));
//   }, [comment.id, repliesMap]);

//   useReplyTreeLayout({
//     showReplies,
//     replyRefs,
//     containerRef,
//     replying,
//     visibleReplies,
//     setContainerHeight,
//     setBranchPositions,
//   });

//   // Returning `null` from a React component means nothing will be rendered to the DOM — it's as if the component doesn't exist visually.
//   if (isFullyDeleted) {
//     return null;
//   }

//   return (
//     <div>
//       <CommentContainer ref={containerRef}>
//         {visibleReplies?.length > 0 && (
//           <TreeLineSVG
//             height={containerHeight - 55}
//             showNewTree={showReplies}
//             branchPositions={branchPositions}
//             depth={depth}
//           />
//         )}

//         {comment.is_deleted ? (
//           <DeletedAvatar $depth={depth} />
//         ) : (
//           <UserAvatar
//             username={comment.users?.username}
//             profilePictureUrl={comment.users?.profile_picture_url}
//             depth={depth}
//           />
//         )}

//         <CommentBody>
//           {comment.is_deleted ? (
//             <CommentText $depth={depth} style={{ fontStyle: "italic" }}>
//               deleted comment 🗑️
//             </CommentText>
//           ) : (
//             <>
//               <CommentHeader comment={comment} depth={depth} />
//               <CommentText $depth={depth} $lang={lang}>
//                 {comment.content}
//               </CommentText>
//               <CommentActions
//                 comment={comment}
//                 replying={replying}
//                 setReplying={setReplying}
//               />
//             </>
//           )}

//           {replying && (
//             <ReplyFormStyled
//               depth={depth}
//               onSubmit={(content) => {
//                 addCommentMutate({
//                   postId: comment.post_id,
//                   content,
//                   parentId: comment.id,
//                 });
//                 setReplying(false);
//               }}
//               buttonText={<IoSendSharp />}
//             />
//           )}

//           {visibleReplies?.length > 0 && (
//             <ReplyViewButton
//               onClick={() => {
//                 setShowReplies(!showReplies);
//               }}
//             >
//               {showReplies
//                 ? "Hide replies"
//                 : visibleReplies.length === 1
//                 ? "View 1 reply"
//                 : `View all ${visibleReplies.length} replies`}
//             </ReplyViewButton>
//           )}
//         </CommentBody>
//       </CommentContainer>

//       {showReplies && visibleReplies?.length > 0 && (
//         <RepliesContainer $depth={depth}>
//           {visibleReplies.map((reply, index) => (
//             <div key={reply.id} ref={(el) => (replyRefs.current[index] = el)}>
//               <CommentItem
//                 comment={reply}
//                 comments={comments}
//                 depth={depth + 1}
//                 repliesMap={repliesMap}
//               />
//             </div>
//           ))}
//         </RepliesContainer>
//       )}
//     </div>
//   );
// };

// export default CommentItem;

import { useState, useRef, useMemo } from "react";
import styled from "styled-components";
import UserAvatar from "../components/Post/UserAvatar";
import TreeLineSVG from "./TreeLineSVG";
import { IoSendSharp } from "react-icons/io5";
import CommentActions from "./CommentActions";
import CommentHeader from "./CommentHeader";
import { useAddComment } from "../hooks/useComments";
import CommentContainer from "./CommentItemParts/CommentContainer";
import ReplyFormStyled from "./CommentItemParts/ReplyFormStyledWrapper";
import ReplyViewButton from "./CommentItemParts/ReplyViewButton";
import RepliesContainer from "./CommentItemParts/RepliesContainer";
import useReplyTreeLayout from "./CommentItemParts/useReplyTreeLayout";
import { getSizeByDepth, isThreadFullyDeleted } from "../utils/helpers";
import { DeletedAvatar } from "../Shared/DeletedAvater";

const CommentText = styled.p`
  margin: 4px 0;
  line-height: 1.4;
  direction: ${({ $lang }) => ($lang === "ar" ? "rtl" : "ltr")};
  font-size: ${({ $depth }) => getSizeByDepth($depth, "commentitemtext")};
  word-break: break-word;
  overflow-wrap: anywhere;
`;

// داخل CommentItem.jsx (أضف هذوله فوق)
const ContentCol = styled.div`
  min-width: 0; /* المفتاح حتى النص يلتف داخل العمود */
  max-width: 100%;
`;

const FormRow = styled.div`
  width: 100%;
  max-width: 100%;
  margin-top: 0.5rem;
`;

const CommentItem = ({ comment, comments, repliesMap, depth = 0 }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replying, setReplying] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const [branchPositions, setBranchPositions] = useState([]);
  const containerRef = useRef(null);
  const replyRefs = useRef([]);

  /*
  * Used a Map to build repliesMap once instead of filtering for each comment — improves performance for large comment trees and keeps parent-child relationships organized.
  * Map was used in the parent PhotoModalCommentsList component instead of this line to avoid duplication every time we get replies using the filter function.
  const replies = comments?.filter((c) => c.parent_comment_id === comment.id);
  */

  const lang = /[\u0600-\u06FF]/.test(comment.content) ? "ar" : "en";
  const { mutate: addCommentMutate } = useAddComment(comment.post_id);

  // خزنت نتيجة الفنكشن لتجنب حسابها أكثر من مرة وتحسين الأداء والوضوح.
  const isFullyDeleted = isThreadFullyDeleted(comment, repliesMap);

  // فلترة الردود لعرض الردود الغير محذوفة أو اللي عندها ردود غير محذوفة
  const visibleReplies = useMemo(() => {
    //Give me all replies to this current comment (comment.id). If there are no replies (i.e. undefined), return an empty array instead of returning undefined and ruining the job.
    const replies = repliesMap.get(comment.id) || [];
    return replies.filter((reply) => !isThreadFullyDeleted(reply, repliesMap));
  }, [comment.id, repliesMap]);

  useReplyTreeLayout({
    showReplies,
    replyRefs,
    containerRef,
    replying,
    visibleReplies,
    setContainerHeight,
    setBranchPositions,
  });

  // Returning `null` from a React component means nothing will be rendered to the DOM — it's as if the component doesn't exist visually.
  if (isFullyDeleted) {
    return null;
  }

  return (
    <div>
      <CommentContainer ref={containerRef}>
        {visibleReplies?.length > 0 && (
          <TreeLineSVG
            height={containerHeight - 55}
            showNewTree={showReplies}
            branchPositions={branchPositions}
            depth={depth}
          />
        )}

        {comment.is_deleted ? (
          <DeletedAvatar $depth={depth} />
        ) : (
          <UserAvatar
            username={comment.users?.username}
            profilePictureUrl={comment.users?.profile_picture_url}
            depth={depth}
          />
        )}

        <ContentCol>
          {comment.is_deleted ? (
            <CommentText $depth={depth} style={{ fontStyle: "italic" }}>
              deleted comment 🗑️
            </CommentText>
          ) : (
            <>
              <CommentHeader comment={comment} depth={depth} />
              <CommentText $depth={depth} $lang={lang}>
                {comment.content}
              </CommentText>
              <CommentActions
                comment={comment}
                replying={replying}
                setReplying={setReplying}
              />
            </>
          )}

          {replying && (
            <FormRow>
              <ReplyFormStyled
                depth={depth}
                onSubmit={(content) => {
                  addCommentMutate({
                    postId: comment.post_id,
                    content,
                    parentId: comment.id,
                  });
                  setReplying(false);
                }}
                buttonText={<IoSendSharp />}
              />
            </FormRow>
          )}

          {visibleReplies?.length > 0 && (
            <ReplyViewButton
              onClick={() => {
                setShowReplies(!showReplies);
              }}
            >
              {showReplies
                ? "Hide replies"
                : visibleReplies.length === 1
                ? "View 1 reply"
                : `View all ${visibleReplies.length} replies`}
            </ReplyViewButton>
          )}
        </ContentCol>
      </CommentContainer>

      {showReplies && visibleReplies?.length > 0 && (
        <RepliesContainer $depth={depth}>
          {visibleReplies.map((reply, index) => (
            <div key={reply.id} ref={(el) => (replyRefs.current[index] = el)}>
              <CommentItem
                comment={reply}
                comments={comments}
                depth={depth + 1}
                repliesMap={repliesMap}
              />
            </div>
          ))}
        </RepliesContainer>
      )}
    </div>
  );
};

export default CommentItem;
