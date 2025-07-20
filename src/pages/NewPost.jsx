import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import NewPostForm from "../components/newpostpages/NewPostForm";
import {
  Container,
  Header,
  BackButton,
  Title,
} from "../components/newpostpages/styles";

const NewPost = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate("/")}>
          <ArrowLeft />
        </BackButton>
        <Title>New Post</Title>
      </Header>

      <NewPostForm />
    </Container>
  );
};

export default NewPost;
