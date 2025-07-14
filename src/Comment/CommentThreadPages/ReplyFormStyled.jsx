import styled from "styled-components";
import ReplyForm from "../ReplyForm";

const ReplyFormStyled = styled(ReplyForm)`
  position: relative;
  border-radius: 4px;
  padding: 0.5rem;
  margin-top: 0.5rem;

  form {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }

  textarea {
    min-height: 40px;
    max-width: 400px;
    border: 2px solid #0e0d0d52;
    background-color: #d4edda;
    border-radius: 5px;
    flex-grow: 1;
    resize: none;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    margin-top: 0;
    align-items: flex-start;
  }
`;

export default ReplyFormStyled;
