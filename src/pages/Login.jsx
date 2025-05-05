import styled from "styled-components";
import LoginForm from "../Auth/LoginForm";

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.bgColor};
  padding: 0 1rem;
`;

const Login = () => {
  return (
    <PageContainer>
      <LoginForm />
    </PageContainer>
  );
};

export default Login;
