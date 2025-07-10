import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  z-index: 1000;
`;

function PhotoModalOverlay({ children }) {
  return <Overlay>{children}</Overlay>;
}

export default PhotoModalOverlay;
