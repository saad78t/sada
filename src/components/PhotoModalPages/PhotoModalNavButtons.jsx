import styled from "styled-components";

const ArrowLeft = styled.button`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 40;
  &:hover {
    color: #1d9bf0;
  }
`;

const ArrowRight = styled(ArrowLeft)`
  left: auto;
  right: 1rem;
`;

function PhotoModalNavButtons({ currentIndex, onNext, onPrev, totalImages }) {
  return (
    <>
      {currentIndex > 0 && <ArrowLeft onClick={onPrev}>←</ArrowLeft>}
      {currentIndex < totalImages - 1 && (
        <ArrowRight onClick={onNext}>→</ArrowRight>
      )}
    </>
  );
}

export default PhotoModalNavButtons;
