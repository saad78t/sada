import { createContext, useContext, useReducer } from "react";
import { useGetComments } from "../../hooks/useComments";
import { useReplieceMap } from "../../hooks/useRepliesMap";
import { useLocation, useParams } from "react-router-dom";
import { useGetLikesMap } from "../../hooks/useGetLikesMap";

const ThreadContext = createContext();

const initialState = { replyingTo: null, openReplies: {} };

function reducer(state, action) {
  switch (action.type) {
    case "replying/to":
      return { ...state, replyingTo: action.payload };
    case "open/replies":
      return {
        ...state,
        openReplies: {
          ...state.openReplies,
          [action.payload]: !state.openReplies[action.payload],
        },
      };
    default:
      throw new Error("SOMETHING WENT WRONG");
  }
}

function CommentThreadContext({ children }) {
  const [{ replyingTo, openReplies }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const postId = queryParams.get("postId");
  const { comments, commentsLoading } = useGetComments(postId);
  const repliesMap = useReplieceMap(comments);

  const { commentId } = useParams();

  //هذا الاسلوب يجيب التعليقات جميعها دفعه واحده للايكات بحيث ما نشوف نقاط التحميل "..." لودنج
  const { likesMap, isLoading: likesLoading } = useGetLikesMap(
    "comment",
    comments.map((comment) => comment.id)
  );

  function toggleReply(commentId) {
    dispatch({ type: "replying/to", payload: commentId });
  }

  function toggleReplies(commentId) {
    dispatch({
      type: "open/replies",
      payload: commentId,
    });
  }

  return (
    <ThreadContext.Provider
      value={{
        replyingTo,
        openReplies,
        comments,
        commentsLoading,
        repliesMap,
        postId,
        commentId,
        likesLoading,
        likesMap,
        setReplyingTo: toggleReply,
        setOpenReplies: toggleReplies,
      }}
    >
      {children}
    </ThreadContext.Provider>
  );
}

function useThreadContext() {
  const context = useContext(ThreadContext);
  if (context === undefined)
    throw new Error("ThreadContext was used out of the CommentThreadContext");
  return context;
}

export { CommentThreadContext, useThreadContext };
