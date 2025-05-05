import styled from "styled-components";
import SignupForm from "../Auth/SignupForm";

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.bgColor};
  padding: 0 1rem; // لحماية المحتوى على الشاشات الصغيرة
`;

const Signup = () => {
  return (
    <PageContainer>
      <SignupForm />
    </PageContainer>
  );
};

export default Signup;
