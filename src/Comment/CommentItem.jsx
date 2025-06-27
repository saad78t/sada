// import { useState, useRef, useEffect } from "react";
// import styled from "styled-components";
// import { ThumbsUp } from "lucide-react";
// import UserAvatar from "../components/Post/UserAvatar";
// import ReplyForm from "./ReplyForm";
// import TreeLineSVG from "./TreeLineSVG";
// import { timeAgo } from "../utils/helpers";

// const CommentContainer = styled.div`
//   position: relative;
//   display: flex;
//   align-items: flex-start;
//   gap: 0.75rem;
//   margin-bottom: 1.75rem;
// `;

// const CommentBody = styled.div`
//   flex: 1;
// `;

// const Username = styled.span`
//   font-weight: bold;
//   color: #1a1a1a;
//   margin-right: 0.5rem;
// `;

// const CommentDate = styled.span`
//   font-size: 0.8rem;
//   color: #65676b;
// `;

// const CommentText = styled.p`
//   margin: 4px 0;
//   line-height: 1.4;
//   direction: ${({ $lang }) => ($lang === "ar" ? "rtl" : "ltr")};
// `;

// const CommentActions = styled.div`
//   display: flex;
//   gap: 1rem;
//   font-size: 0.85rem;
//   color: #1a1a1a;
//   margin: 0.5rem 0;
// `;

// const ActionButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   color: #1a1a1a;
//   display: flex;
//   align-items: center;
//   gap: 4px;

//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const RepliesContainer = styled.div`
//   margin-top: 0.5rem;
//   margin-left: 48px;
// `;

// const ReplyViewButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   color: #385898;
//   font-size: 0.85rem;
//   padding: 0;
//   margin: 0.25rem 0 0 0;

//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const ReplyFormStyled = styled(ReplyForm)`
//   background-color: #d4edda;
//   border-radius: 4px;
//   padding: 0.5rem;
//   margin-top: 0.5rem;
// `;

// const CommentItem = ({ comment, comments, depth = 0, onReplySubmit }) => {
//   const [showReplies, setShowReplies] = useState(false);
//   const [replying, setReplying] = useState(false);
//   const [containerHeight, setContainerHeight] = useState(0); //الارتفاع الكامل لتعليق واحد فقط (يعني من صورة البروفايل إلى آخر شي فيه مثل زر "Reply" أو "View all replies").

//   const containerRef = useRef(null);

//   const replies = comments?.filter((c) => c.parent_comment_id === comment.id);
//   const lang = /[\u0600-\u06FF]/.test(comment.content) ? "ar" : "en";

//   const handleReply = (content) => {
//     onReplySubmit(content, comment.id);
//     setReplying(false);
//   };

//   useEffect(() => {
//     if (containerRef.current) {
//       setContainerHeight(containerRef.current.offsetHeight);
//     }
//   }, [showReplies, replying, replies]);

//   return (
//     <div>
//       <CommentContainer ref={containerRef}>
//         {replies?.length > 0 && !showReplies && (
//           <TreeLineSVG height={containerHeight - 55} />
//         )}

//         <UserAvatar
//           username={comment.users?.username}
//           profilePictureUrl={comment.users?.profile_picture_url}
//           style={{ position: "relative", zIndex: 1 }}
//         />
//         <CommentBody>
//           <div>
//             <Username>{comment.users?.username}</Username>
//             <CommentDate>· {timeAgo(comment.created_at)}</CommentDate>
//           </div>
//           <CommentText $lang={lang}>{comment.content}</CommentText>
//           <CommentActions>
//             <ActionButton>
//               <ThumbsUp size={14} /> Like
//             </ActionButton>
//             <ActionButton onClick={() => setReplying(!replying)}>
//               Reply
//             </ActionButton>
//           </CommentActions>
//           {replying && (
//             <ReplyFormStyled
//               onSubmit={handleReply}
//               onCancel={() => setReplying(false)}
//             />
//           )}
//           {replies?.length > 0 && (
//             <ReplyViewButton onClick={() => setShowReplies(!showReplies)}>
//               {showReplies
//                 ? "Hide replies"
//                 : `View all ${replies.length} replies`}
//             </ReplyViewButton>
//           )}
//         </CommentBody>
//       </CommentContainer>

//       {showReplies && replies?.length > 0 && (
//         <RepliesContainer>
//           {replies.map((reply) => (
//             <CommentItem
//               key={reply.id}
//               comment={reply}
//               comments={comments}
//               depth={depth + 1}
//               onReplySubmit={onReplySubmit}
//             />
//           ))}
//         </RepliesContainer>
//       )}
//     </div>
//   );
// };

// export default CommentItem;

//branches tree 👇

// import { useState, useRef, useEffect } from "react";
// import styled from "styled-components";
// import { ThumbsUp } from "lucide-react";
// import UserAvatar from "../components/Post/UserAvatar";
// import ReplyForm from "./ReplyForm";
// import TreeLineSVG from "./TreeLineSVG";
// import { timeAgo } from "../utils/helpers";

// const CommentContainer = styled.div`
//   position: relative;
//   display: flex;
//   align-items: flex-start;
//   gap: 0.75rem;
//   margin-bottom: 1.75rem;
// `;

// const CommentBody = styled.div`
//   flex: 1;
// `;

// const Username = styled.span`
//   font-weight: bold;
//   color: #1a1a1a;
//   margin-right: 0.75rem;
// `;

// const CommentDate = styled.span`
//   font-size: 0.8rem;
//   color: #65676b;
// `;

// const CommentText = styled.p`
//   margin: 4px 0;
//   line-height: 1.4;
//   direction: ${({ $lang }) => ($lang === "ar" ? "rtl" : "ltr")};
// `;

// const CommentActions = styled.div`
//   display: flex;
//   gap: 1rem;
//   font-size: 0.85rem;
//   color: #1a1a1a;
//   margin: 0.5rem 0;
// `;

// const ActionButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   color: #1a1a1a;
//   display: flex;
//   align-items: center;
//   gap: 4px;

//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const RepliesContainer = styled.div`
//   margin-top: 0.5rem;
//   margin-left: 48px;
//   position: relative;
// `;

// const ReplyViewButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   color: #385898;
//   font-size: 0.85rem;
//   padding: 0;
//   margin: 0.25rem 0 0 0;

//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const ReplyFormStyled = styled(ReplyForm)`
//   background-color: #d4edda;
//   border-radius: 4px;
//   padding: 0.5rem;
//   margin-top: 0.5rem;
// `;

// const CommentItem = ({ comment, comments, depth = 0, onReplySubmit }) => {
//   const [showReplies, setShowReplies] = useState(false);
//   const [replying, setReplying] = useState(false);
//   const [showNewTree, setShowNewTree] = useState(false);
//   const [containerHeight, setContainerHeight] = useState(0);
//   const [repliesHeight, setRepliesHeight] = useState(0);

//   const containerRef = useRef(null);
//   const repliesRef = useRef(null);

//   const replies = comments?.filter((c) => c.parent_comment_id === comment.id);
//   const lang = /[\u0600-\u06FF]/.test(comment.content) ? "ar" : "en";

//   const handleReply = (content) => {
//     onReplySubmit(content, comment.id);
//     setReplying(false);
//   };

//   useEffect(() => {
//     if (containerRef.current) {
//       setContainerHeight(containerRef.current.offsetHeight);
//     }
//     if (repliesRef.current && showReplies) {
//       setRepliesHeight(repliesRef.current.offsetHeight);
//     }
//   }, [showReplies, replying, replies]);

//   return (
//     <div>
//       <CommentContainer ref={containerRef}>
//         {replies?.length > 0 && (
//           <TreeLineSVG
//             height={containerHeight - 55}
//             showNewTree={showNewTree}
//             replies={replies}
//             repliesHeight={repliesHeight}
//             depth={depth}
//           />
//         )}

//         <UserAvatar
//           username={comment.users?.username}
//           profilePictureUrl={comment.users?.profile_picture_url}
//           style={{ position: "relative", zIndex: 1 }}
//         />
//         <CommentBody>
//           <div>
//             <Username>{comment.users?.username}</Username>
//             <CommentDate>· {timeAgo(comment.created_at)}</CommentDate>
//           </div>
//           <CommentText $lang={lang}>{comment.content}</CommentText>
//           <CommentActions>
//             <ActionButton>
//               <ThumbsUp size={14} /> Like
//             </ActionButton>
//             <ActionButton onClick={() => setReplying(!replying)}>
//               Reply
//             </ActionButton>
//           </CommentActions>
//           {replying && (
//             <ReplyFormStyled
//               onSubmit={handleReply}
//               onCancel={() => setReplying(false)}
//             />
//           )}
//           {replies?.length > 0 && (
//             <ReplyViewButton
//               onClick={() => {
//                 setShowReplies(!showReplies);
//                 setShowNewTree(!showNewTree);
//               }}
//             >
//               {showReplies
//                 ? "Hide replies"
//                 : `View all ${replies.length} replies`}
//             </ReplyViewButton>
//           )}
//         </CommentBody>
//       </CommentContainer>

//       {showReplies && replies?.length > 0 && (
//         <RepliesContainer ref={repliesRef}>
//           {replies.map((reply) => (
//             <CommentItem
//               key={reply.id}
//               comment={reply}
//               comments={comments}
//               depth={depth + 1}
//               onReplySubmit={onReplySubmit}
//             />
//           ))}
//         </RepliesContainer>
//       )}
//     </div>
//   );
// };

// export default CommentItem;

import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { ThumbsUp } from "lucide-react";
import UserAvatar from "../components/Post/UserAvatar";
import ReplyForm from "./ReplyForm";
import TreeLineSVG from "./TreeLineSVG";
import { timeAgo } from "../utils/helpers";

const CommentContainer = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1.75rem;
`;

const CommentBody = styled.div`
  flex: 1;
`;

const Username = styled.span`
  font-weight: bold;
  color: #1a1a1a;
  margin-right: 0.75rem;
`;

const CommentDate = styled.span`
  font-size: 0.8rem;
  color: #65676b;
`;

const CommentText = styled.p`
  margin: 4px 0;
  line-height: 1.4;
  direction: ${({ $lang }) => ($lang === "ar" ? "rtl" : "ltr")};
`;

const CommentActions = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: #1a1a1a;
  margin: 0.5rem 0;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    text-decoration: underline;
  }
`;

const RepliesContainer = styled.div`
  margin-top: 0.5rem;
  margin-left: 48px;
  position: relative;
`;

const ReplyViewButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #385898;
  font-size: 0.85rem;
  padding: 0;
  margin: 0.25rem 0 0 0;

  &:hover {
    text-decoration: underline;
  }
`;

const ReplyFormStyled = styled(ReplyForm)`
  background-color: #d4edda;
  border-radius: 4px;
  padding: 0.5rem;
  margin-top: 0.5rem;
`;

const CommentItem = ({ comment, comments, depth = 0, onReplySubmit }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replying, setReplying] = useState(false);
  const [showNewTree, setShowNewTree] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0); //This value represents the height of the current comment's base container (the large element that contains the comment).
  const [branchPositions, setBranchPositions] = useState([]); //Represents the locations of tree line branches (the small branches that go to the responses).

  const containerRef = useRef(null); //To point to the comment element itself (so we can get its height).
  const replyRefs = useRef([]); //The Refs array stores DOM elements for responses (so we know exactly where each response is located).

  const replies = comments?.filter((c) => c.parent_comment_id === comment.id);
  const lang = /[\u0600-\u06FF]/.test(comment.content) ? "ar" : "en";

  const handleReply = (content) => {
    onReplySubmit(content, comment.id);
    setReplying(false);
  };

  useEffect(() => {
    let animationFrameId;

    if (containerRef.current) {
      //requestAnimationFrame executes the code after the browser has finished drawing the DOM. It will not read the offsetHeight until all elements are ready.
      animationFrameId = requestAnimationFrame(() => {
        if (containerRef.current) {
          setContainerHeight(containerRef.current.offsetHeight);
        }
      });
    }

    if (showReplies && replyRefs.current.length) {
      animationFrameId = requestAnimationFrame(() => {
        const positions = replyRefs.current.map((ref) => {
          if (ref) {
            const rect = ref.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();
            return rect.top - containerRect.top + 16;
          }
          return 0;
        });
        setBranchPositions(positions);
      });
    }

    // Clean up
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [showReplies, replying, replies]);

  return (
    <div>
      <CommentContainer ref={containerRef}>
        {replies?.length > 0 && (
          <TreeLineSVG
            height={containerHeight - 55}
            showNewTree={showNewTree}
            branchPositions={branchPositions}
          />
        )}

        <UserAvatar
          username={comment.users?.username}
          profilePictureUrl={comment.users?.profile_picture_url}
          style={{ position: "relative", zIndex: 1 }}
        />
        <CommentBody>
          <div>
            <Username>{comment.users?.username}</Username>
            <CommentDate>· {timeAgo(comment.created_at)}</CommentDate>
          </div>
          <CommentText $lang={lang}>{comment.content}</CommentText>
          <CommentActions>
            <ActionButton>
              <ThumbsUp size={14} /> Like
            </ActionButton>
            <ActionButton onClick={() => setReplying(!replying)}>
              Reply
            </ActionButton>
          </CommentActions>
          {replying && (
            <ReplyFormStyled
              onSubmit={handleReply}
              onCancel={() => setReplying(false)}
            />
          )}
          {replies?.length > 0 && (
            <ReplyViewButton
              onClick={() => {
                setShowReplies(!showReplies);
                setShowNewTree(!showNewTree);
              }}
            >
              {showReplies
                ? "Hide replies"
                : `View all ${replies.length} replies`}
            </ReplyViewButton>
          )}
        </CommentBody>
      </CommentContainer>

      {showReplies && replies?.length > 0 && (
        <RepliesContainer>
          {replies.map((reply, index) => (
            <div
              key={reply.id}
              // Store each reply's div element in replyRefs by its index
              // To access their positions later for drawing branches
              ref={(el) => (replyRefs.current[index] = el)}
            >
              <CommentItem
                comment={reply}
                comments={comments}
                depth={depth + 1}
                onReplySubmit={onReplySubmit}
              />
            </div>
          ))}
        </RepliesContainer>
      )}
    </div>
  );
};

export default CommentItem;
