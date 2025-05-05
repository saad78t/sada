import styled from "styled-components";
import PostItem from "../components/Post/PostItem";

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

const dummyPosts = [
  {
    id: 1,
    username: "ahmed",
    content: "هذا أول بوست!",
    createdAt: "2025-05-04",
  },
  {
    id: 2,
    username: "sara",
    content: "أحب React كثيرًا 💙",
    createdAt: "2025-05-03",
  },
];

const Home = () => {
  return (
    <HomeContainer>
      <PostList>
        {dummyPosts.length === 0 ? (
          <EmptyState>No posts yet</EmptyState>
        ) : (
          dummyPosts.map((post) => <PostItem post={post} key={post.id} />)
        )}
      </PostList>
    </HomeContainer>
  );
};

export default Home;
