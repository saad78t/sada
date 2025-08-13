import CommentThread from "../CommentThread";
import { CommentThreadContext } from "./CommentThreadContext";

function CommentThreadWithProvider() {
  return (
    <CommentThreadContext>
      <CommentThread />
    </CommentThreadContext>
  );
}

export default CommentThreadWithProvider;
