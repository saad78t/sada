import styled from "styled-components";
import ReplyForm from "../ReplyForm";

const ReplyFormStyled = styled(ReplyForm)`
  position: relative;
  border-radius: 4px;
  padding: 0.5rem;
  margin-top: 0.5rem;
  textarea {
    min-height: 10px;
    border: 2px solid #0e0d0d52;
    background-color: #d4edda;
    border-radius: 5px;
  }

  button {
    position: absolute;
    padding: 0.4rem 0.7rem;
    right: 0.5rem;
    background-color: #1d9bf0;
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    cursor: pointer;
  }
`;

export default ReplyFormStyled;
