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

const BackToLogin = styled.a`
  text-align: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.buttonBg};
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.buttonHover};
  }
`;

const ForgotPassword = () => {
  return (
    <Wrapper>
      <Card>
        <Title>Forgot your password?</Title>
        <Form>
          <Input type="email" placeholder="Enter your email address" />
          <SubmitButton>Send reset link</SubmitButton>
          <BackToLogin>Back to login</BackToLogin>
        </Form>
      </Card>
    </Wrapper>
  );
};

export default ForgotPassword;
