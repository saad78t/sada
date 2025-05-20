// import styled from "styled-components";
// import PostItem from "../components/Post/PostItem";
// import Spinner from "../Shared/Spinner";
// import { useQuery } from "@tanstack/react-query";
// import { getPosts } from "../services/postService";
// import { useEffect } from "react";

// const HomeContainer = styled.div`
//   max-width: 600px;
//   margin: 0 auto;
//   padding: 2rem 1rem;

//   @media (min-width: 768px) {
//     padding: 3rem 2rem;
//   }
// `;

// const PostList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
// `;

// const EmptyState = styled.p`
//   text-align: center;
//   color: ${({ theme }) => theme.textColor};
//   font-size: 1.2rem;

//   @media (min-width: 768px) {
//     font-size: 1.4rem;
//   }

//   margin-top: 2rem;
// `;

// const Home = () => {
//   const {
//     isLoading,
//     data: posts,
//     error,
//   } = useQuery({
//     queryKey: ["Posts"],
//     queryFn: getPosts,
//   });

//   if (error) {
//     console.error(error);
//     throw new Error("posts can't be loaded");
//   }

//   // Preserve scroll position after closing photo modal
//   useEffect(() => {
//     const scrollY = sessionStorage.getItem("scrollY");
//     if (scrollY) {
//       window.scrollTo(0, parseInt(scrollY));
//       sessionStorage.removeItem("scrollY");
//     }
//   }, []);

//   return (
//     <HomeContainer>
//       {isLoading && <Spinner />}

//       <PostList>
//         {!isLoading && posts?.length === 0 && (
//           <EmptyState>There are no posts currently.</EmptyState>
//         )}

//         {!isLoading &&
//           posts?.map((post) => <PostItem post={post} key={post.id} />)}
//       </PostList>
//     </HomeContainer>
//   );
// };

// export default Home;

//كود معدل
import styled from "styled-components";
import PostItem from "../components/Post/PostItem";
import Spinner from "../Shared/Spinner";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../services/postService";
import { useEffect } from "react";

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

  return (
    <HomeContainer>
      {isLoading && <Spinner />}

      <PostList>
        {!isLoading && posts?.length === 0 && (
          <EmptyState>There are no posts currently.</EmptyState>
        )}

        {!isLoading &&
          posts?.map((post) => <PostItem post={post} key={post.id} />)}
      </PostList>
    </HomeContainer>
  );
};

export default Home;
