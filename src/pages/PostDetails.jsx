import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../services/postService";
import Spinner from "../Shared/Spinner";
import ReplyForm from "../Comment/ReplyForm";
import PostDetailsHeader from "../components/PostDetailsPages/PostDetailsHeader";
import PostDetailsContent from "../components/PostDetailsPages/PostDetailsContent";
import PostDetailsActions from "../components/PostDetailsPages/PostDetailsActions";
import PostDetailsComments from "../components/PostDetailsPages/PostDetailsComments";
import { useAddComment } from "../hooks/useComments";
import PostDetailsMeta from "../components/PostDetailsPages/PostDetailsMeta";

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const ContentWrapper = styled.div`
  max-width: 550px;
  margin: 0 auto;
`;

const PostDetails = () => {
  const { id } = useParams();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
    enabled: !!id,
  });

  const addCommentMutation = useAddComment(post?.id);

  if (isLoading) return <Spinner />;
  if (error || !post) return <p>Post not found</p>;

  return (
    <ContentWrapper>
      <Container>
        <PostDetailsHeader post={post} />
        <PostDetailsContent post={post} />

        <div style={{ marginTop: "0.5rem" }}>
          <PostDetailsMeta post={post} />
        </div>

        {/* أكشن مع خط فوق وتحت */}
        <div
          style={{
            marginTop: "0.5rem",
            borderTop: "1px solid #eee",
            borderBottom: "1px solid #eee",
            padding: "0.5rem 0",
          }}
        >
          <PostDetailsActions post={post} />
        </div>

        <div style={{ marginTop: "2rem" }}>
          <ReplyForm
            onSubmit={(content) => addCommentMutation.mutate({ content })}
            buttonText="Comment"
            placeholder="Write a comment..."
          />
        </div>
        <PostDetailsComments post={post} />
      </Container>
    </ContentWrapper>
  );
};

export default PostDetails;
