import { createContext, useContext, useReducer } from "react";

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
