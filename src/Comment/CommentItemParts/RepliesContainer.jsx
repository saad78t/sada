import styled from "styled-components";
import { getSizeByDepth } from "../../utils/helpers";

// const RepliesContainer = styled.div`
//   margin-top: 0.5rem;
//   /* margin-left: 48px; */
//   margin-left: ${({ $depth }) =>
//     getSizeByDepth($depth, "commentitemrepliescontainer")};
//   position: relative;
// `;

const RepliesContainer = styled.div`
  margin-top: 0.5rem;
  padding-left: ${({ $depth }) =>
    getSizeByDepth($depth, "commentitemrepliescontainer")};
  position: relative;
  min-width: 0; /* يمنع خروج المحتوى برّه */
`;

export default RepliesContainer;
