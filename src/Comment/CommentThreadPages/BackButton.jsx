import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ArrowLeft } from "lucide-react";

const BackButtonArrow = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #1da1f2; /* لون تويتر */
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 9999px; /* زر دائري */
  cursor: pointer;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1a91da; /* لون أغمق عند التحويل */
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

function BackButton({ postId }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(`/post/${postId}`);
  };

  return (
    <BackButtonArrow onClick={handleBackClick}>
      <ArrowLeft />
      Back to Post
    </BackButtonArrow>
  );
}

export default BackButton;
