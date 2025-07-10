import styled from "styled-components";

const MediaGrid = styled.div`
  display: grid;
  direction: ltr;
  gap: 4px;
  width: 100%; /*The grid takes up the entire width of the parent element. */
  ${({ $count }) => {
    if ($count === 1) return `grid-template-columns: 1fr;`;
    if ($count === 2) return `grid-template-columns: 1fr 1fr;`;
    /* The first column takes "2fr" → meaning twice the size of the second column.
     * fr means "Fraction" (relative fraction of the remaining area).
     */
    if ($count === 3)
      return `
        grid-template-columns: 2fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-template-areas:
          'main side1'
          'main side2';
      `;
    /*max-height prevents the grid from growing larger than 360px. */
    return `
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      max-height: 360px;
    `;
  }}
`;

export default MediaGrid;
