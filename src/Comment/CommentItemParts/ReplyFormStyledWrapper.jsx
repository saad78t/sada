// import styled from "styled-components";
// import ReplyForm from "../ReplyForm";
// import { getSizeByDepth } from "../../utils/helpers";

// const ReplyFormStyled = styled(ReplyForm)`
//   position: relative;
//   border-radius: 4px;
//   padding: 0.5rem;
//   margin-top: 0.5rem;
//   textarea {
//     min-height: 10px;
//     width: ${({ depth }) => getSizeByDepth(depth, "replyform")};
//     border: 2px solid #0e0d0d52;
//     background-color: #d4edda;
//     border-radius: 5px;
//   }

//   button {
//     position: absolute;
//     padding: 0.4rem 0.7rem;
//     right: 0.5rem;
//     background-color: #1d9bf0;
//     color: white;
//     border: none;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 1rem;
//     cursor: pointer;
//   }
// `;

// export default ReplyFormStyled;

// import styled from "styled-components";
// import ReplyForm from "../ReplyForm";
// import { getSizeByDepth } from "../../utils/helpers";

// const ReplyFormStyled = styled(ReplyForm)`
//   position: relative;
//   border-radius: 4px;
//   padding: 0.5rem;
//   margin-top: 0.5rem;

//   textarea {
//     width: ${({ depth }) => getSizeByDepth(depth, "commentitemreplyformwidth")};
//     min-height: ${({ depth }) =>
//       getSizeByDepth(depth, "avatar")}; // يبدأ بارتفاع الصورة
//     max-height: 120px; // أقصى ارتفاع (يعادل تقريباً 5 أسطر)
//     border: 2px solid #0e0d0d52;
//     background-color: #d4edda;
//     border-radius: 5px;
//     font-size: ${({ depth }) => (depth === 0 ? "1rem" : "0.85rem")};

//     padding: 0 0.5rem;
//     box-sizing: border-box;

//     line-height: 1.2rem; // أو أي قيمة مناسبة للخط
//   }

//   button {
//     position: absolute;
//     padding: 0.4rem 0.7rem;
//     right: 0.5rem;
//     background-color: #1d9bf0;
//     color: white;
//     border: none;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: ${({ depth }) => (depth === 0 ? "1rem" : "0.85rem")};
//     cursor: pointer;
//   }
// `;

// export default ReplyFormStyled;

import styled from "styled-components";
import ReplyForm from "../ReplyForm";
import { getSizeByDepth } from "../../utils/helpers";

const ReplyFormStyled = styled(ReplyForm)`
  position: relative;
  border-radius: 4px;
  padding: 0.5rem;
  margin-top: 0.5rem;

  textarea {
    width: ${({ depth }) => getSizeByDepth(depth, "commentitemreplyformwidth")};
    min-height: ${({ depth }) => getSizeByDepth(depth, "avatar")};
    max-height: 120px;
    border: 2px solid #0e0d0d52;
    background-color: #d4edda;
    border-radius: 5px;
    font-size: ${({ depth }) => (depth === 0 ? "1rem" : "0.85rem")};

    padding: 0 0.5rem;
    box-sizing: border-box;

    line-height: 1.2rem; // أو أي قيمة مناسبة للخط
  }

  display: flex;
  gap: ${({ depth }) =>
    getSizeByDepth(depth, "commentitemreplyformgap")} !important;

  button {
    position: absolute;
    padding: 0.4rem 0.7rem;
    right: ${({ depth }) =>
      getSizeByDepth(depth, "commentitemreplyformbutton")} !important;
    background-color: #1d9bf0;
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${({ depth }) => (depth === 0 ? "1rem" : "0.85rem")};
    cursor: pointer;
  }
`;

export default ReplyFormStyled;
