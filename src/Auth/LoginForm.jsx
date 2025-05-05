import styled from "styled-components";
import { Wrapper, Card } from "./AuthWrapper";

const Title = styled.h2`
  margin-bottom: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.textColor};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.buttonBg};
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
`;

const ForgotLink = styled.a`
  text-align: right;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.buttonBg};
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.buttonHover};
  }
`;

const LoginForm = () => {
  return (
    <Wrapper>
      <Card>
        <Title>Sign in</Title>
        <Form>
          <Input type="email" placeholder="e-mail" />
          <Input type="password" placeholder="password" />
          <ForgotLink>Forgot your password?</ForgotLink>
          <SubmitButton>Login</SubmitButton>
        </Form>
      </Card>
    </Wrapper>
  );
};

export default LoginForm;
