import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllComments } from "../services/commentService";

import Spinner from "../Shared/Spinner";
import CommentItem from "./CommentItem";

const CommentDetails = () => {
  const { id } = useParams();

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getAllComments(),
  });

  if (isLoading) return <Spinner />;

  const mainComment = comments.find((c) => c.id === parseInt(id));
  const replies = comments.filter((c) => c.parent_comment_id === parseInt(id));

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      {/* التعليق الرئيسي */}
      <CommentItem comment={mainComment} repliesCount={replies.length} />

      {/* خط أو رابط للمنشور الأصلي، ممكن مستقبلاً نربطه فعلياً */}
      <div
        style={{
          borderLeft: "3px solid gray",
          height: "30px",
          marginLeft: "1rem",
        }}
      ></div>

      {/* الردود */}
      {replies.map((reply) => (
        <div key={reply.id} style={{ marginLeft: "1.5rem" }}>
          <CommentItem comment={reply} repliesCount={0} />
        </div>
      ))}
    </div>
  );
};

export default CommentDetails;
