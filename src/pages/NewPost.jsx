import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import NewPostForm from "../components/newpostpages/NewPostForm";
import {
  Container,
  Header,
  BackButton,
  Title,
} from "../components/newpostpages/styles";
import { useCreatePost } from "../hooks/usePost";

const NewPost = () => {
  const navigate = useNavigate();
  const { mutate, isPending: isCreating } = useCreatePost();

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate("/")} disabled={isCreating}>
          <ArrowLeft />
        </BackButton>
        <Title>New Post</Title>
      </Header>

      <NewPostForm mutate={mutate} isCreating={isCreating} />
    </Container>
  );
};

export default NewPost;
