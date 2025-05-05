import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem;
`;

const SpinnerCircle = styled.div`
  width: 40px;
  height: 40px;
  border: 5px solid ${({ theme }) => theme.borderColor};
  border-top-color: ${({ theme }) => theme.buttonBg};
  border-radius: 50%;
  animation: ${spin} 0.9s ease-in-out infinite;
`;

const SpinnerText = styled.p`
  margin-top: 1rem;
  color: ${({ theme }) => theme.textColor};
  font-size: 0.95rem;
  opacity: 0.8;
`;

const Spinner = () => (
  <SpinnerWrapper>
    <SpinnerCircle />
    <SpinnerText>Loading...</SpinnerText>
  </SpinnerWrapper>
);

export default Spinner;
