// Toast.jsx
import styled from "styled-components";

export const ToastContainer = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 2000;
`;

export const ToastMessage = styled.div`
  background-color: ${({ theme }) => theme.toastBg || "#323232"};
  color: ${({ theme }) => theme.toastText || "#ffffff"};
  padding: 12px 16px;
  border-radius: 8px;
  margin-top: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  animation: fadein 0.3s ease;

  @keyframes fadein {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
