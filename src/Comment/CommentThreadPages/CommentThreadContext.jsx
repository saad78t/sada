import { createContext, useContext, useReducer } from "react";

const ThreadContext = createContext();

const initialState = { replyingTo: null, openReplies: {} };

function reducer(state, action) {
  switch (action.type) {
    case "replying/to":
      return { ...state, replyingTo: action.payload };

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

  return (
    <ThreadContext.Provider
      value={{ replyingTo, openReplies, setReplyingTo: toggleReply }}
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
