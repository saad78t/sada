// const TreeLineSVG = ({ depth }) => {
//   const avatarHeight = 40;
//   const verticalLength = 50;
//   const curveRadius = 10; // هذا نصف قطر الكيرف
//   const targetX = 45;

//   const topOffset = depth === 0 ? avatarHeight : 0;
//   const leftOffset = depth === 0 ? 12 : 0;

//   return (
//     <svg
//       width={targetX + 10}
//       height={verticalLength + curveRadius}
//       style={{
//         position: "absolute",
//         top: `${topOffset}px`,
//         left: `${leftOffset}px`,
//       }}
//     >
//       <path
//         d={`
//           M10 0
//           L10 ${verticalLength}
//           Q10 ${verticalLength + curveRadius} ${10 + curveRadius} ${
//           verticalLength + curveRadius
//         }
//           L${targetX} ${verticalLength + curveRadius}
//         `}
//         stroke="#ddd"
//         strokeWidth="2"
//         fill="none"
//         strokeLinecap="round"
//       />
//     </svg>
//   );
// };

// export default TreeLineSVG;

// const TreeLineSVG = ({ height = 60 }) => {
//   const startX = 22;
//   const verticalLength = height;
//   const curveRadius = 10;
//   const targetX = 45;

//   return (
//     <svg
//       width={targetX + 10}
//       height={verticalLength + curveRadius}
//       style={{
//         position: "absolute",
//         top: `40px`, // يبدأ من اسفل الصورة
//         left: "12px",
//       }}
//     >
//       <path
//         d={`
//           M${startX} 0
//           L${startX} ${verticalLength}
//           Q${startX} ${verticalLength + curveRadius} ${startX + curveRadius} ${
//           verticalLength + curveRadius
//         }
//           L${targetX} ${verticalLength + curveRadius}
//         `}
//         stroke="#ddd"
//         strokeWidth="2"
//         fill="none"
//         strokeLinecap="round"
//       />
//     </svg>
//   );
// };

// export default TreeLineSVG;

import React from "react";

const TreeLineSVG = ({ height }) => {
  const startX = 12;
  const verticalLength = height;
  const curveRadius = 10;
  const targetX = 45;

  if (!height) return null;

  return (
    <svg
      width={targetX + 10}
      height={verticalLength + curveRadius}
      style={{
        position: "absolute",
        top: `40px`,
        left: "12px",
        zIndex: 0,
      }}
    >
      <path
        d={`
          M${startX} 0
          L${startX} ${verticalLength}
          Q${startX} ${verticalLength + curveRadius} ${startX + curveRadius} ${
          verticalLength + curveRadius
        }
          L${targetX} ${verticalLength + curveRadius}
        `}
        stroke="#ddd"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default TreeLineSVG;
