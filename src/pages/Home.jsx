import styled from "styled-components";
import PostItem from "../components/Post/PostItem";
import Spinner from "../Shared/Spinner";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../services/postService";
import { useEffect, useMemo } from "react";
import { useGetLikesMap } from "../hooks/useGetLikesMap";

const HomeContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;

  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const EmptyState = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.textColor};
  font-size: 1.2rem;

  @media (min-width: 768px) {
    font-size: 1.4rem;
  }

  margin-top: 2rem;
`;

const Home = () => {
  const {
    isLoading,
    data: posts,
    error,
  } = useQuery({
    queryKey: ["Posts"],
    queryFn: getPosts,
  });

  const postIds = useMemo(() => posts?.map((p) => p.id), [posts]);
  const { likesMap, isLoading: likesLoading } = useGetLikesMap("post", postIds);

  if (error) {
    console.error(error);
    throw new Error("posts can't be loaded");
  }

  // Preserve scroll position after closing photo modal
  useEffect(() => {
    const scrollY = sessionStorage.getItem("scrollY");
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY));
      sessionStorage.removeItem("scrollY");
    }
  }, []); // Empty dependency array to run once on mount

  const visiblePosts = useMemo(
    () => (posts || []).filter((p) => !p.is_deleted),
    [posts]
  );

  return (
    <HomeContainer>
      {isLoading && <Spinner />}

      <PostList>
        {!isLoading && posts?.length === 0 && (
          <EmptyState>There are no posts currently.</EmptyState>
        )}

        {/* Using filter before map improves performance by excluding deleted posts upfront,
 so map only iterates over relevant items instead of all posts. */}
        {!isLoading &&
          visiblePosts.map((post) => (
            <PostItem
              post={post}
              key={post.id}
              likesMap={likesMap}
              likesLoading={likesLoading}
            />
          ))}
      </PostList>
    </HomeContainer>
  );
};

export default Home;
