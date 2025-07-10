import styled from "styled-components";

const MediaItem = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 8px;

  ${({ $count, $index }) => {
    if ($count === 3) {
      if ($index === 0) return "grid-area: main;";
      if ($index === 1) return "grid-area: side1;";
      if ($index === 2) return "grid-area: side2;";
    }
    return "";
  }}

  ${({ $count }) => {
    if ($count === 1) return `max-height: 400px;`;
    if ($count >= 4)
      return `
        aspect-ratio: 1 / 1;
        height: 150px;
      `;
    return `aspect-ratio: 1 / 1;`;
  }}
`;

export default MediaItem;
