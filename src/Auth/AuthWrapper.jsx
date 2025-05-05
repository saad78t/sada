import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.textColor};
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.modalBg};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  min-width: 350px;
  max-width: 400px;
  width: 100%;
`;

export { Wrapper, Card };
