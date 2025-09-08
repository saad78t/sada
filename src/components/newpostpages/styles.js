import { css, styled } from "styled-components";

export const disabledStyles = css`
  &:disabled,
  &:disabled:hover,
  &:disabled:focus {
    background-color: #d3d3d3;
    color: #777;
    cursor: not-allowed;
    box-shadow: none;
    outline: none;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ disabled, theme }) =>
    disabled ? "#f0f0f0" : theme.bgColor};
  color: ${({ disabled, theme }) => (disabled ? "#9e9e9e" : theme.textColor)};
  border-radius: 8px;
  padding: 0.8rem 1.2rem;

  ${disabledStyles}
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 1rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ disabled, theme }) =>
    disabled ? "#f0f0f0" : theme.bgColor};
  color: ${({ disabled, theme }) => (disabled ? "#9e9e9e" : theme.textColor)};
  resize: vertical;

  ${disabledStyles}
`;

export const FileRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SubmitButton = styled.button`
  padding: 0.75rem 1.25rem;
  background-color: ${({ disabled, theme }) =>
    disabled ? "#d3d3d3" : theme.buttonBg};
  color: ${({ disabled, theme }) => (disabled ? "#777" : theme.buttonText)};
  border: none;
  border-radius: 8px;
  font-weight: bold;
  align-self: flex-end;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${({ disabled, theme }) =>
      disabled ? "#d3d3d3" : theme.buttonHover};
    transition: background-color 0.3s ease;
  }

  .dots {
    display: inline-block;
    width: 1em;
    text-align: left;

    &::after {
      content: "";
      animation: dots 1s steps(3, end) infinite;
    }
  }

  @keyframes dots {
    0%,
    20% {
      content: "";
    }
    40% {
      content: ".";
    }
    60% {
      content: "..";
    }
    80%,
    100% {
      content: "...";
    }
  }

  ${disabledStyles}
`;

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textColor};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  font-size: 1.5rem;

  &:hover {
    color: ${({ disabled, theme }) => (disabled ? theme.textColor : "#555")};
    transition: color 0.3s ease;
  }
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.textColor};
`;
