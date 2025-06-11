// const TreeLineSVG = ({ height }) => {
//   const newHeight = Math.abs(height);
//   const startX = 12; //Start of left line on X-axis.
//   const verticalLength = newHeight; //The length of the vertical part that goes down
//   const curveRadius = 10; //radius of curvature (curve).
//   const targetX = 45; //End of horizontal line (on X-axis).

//   if (!newHeight) return null;
//   return (
//     <svg
//       width={targetX + 10}
//       height={verticalLength + curveRadius}
//       style={{
//         position: "absolute",
//         top: `40px`,
//         left: "12px",
//         zIndex: 0,
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

//branches tree 👇
// const TreeLineSVG = ({ height, showNewTree, replies, repliesHeight }) => {
//   const newHeight = Math.abs(height);
//   const startX = 12; // Start of left line on X-axis.
//   const verticalLength = newHeight; // الخط القديم
//   const curveRadius = 10; // radius of curvature (curve).
//   const targetX = 45; // End of horizontal line (on X-axis).

//   if (!newHeight) return null; // الشجرة تظهر في كل المستويات

//   if (!showNewTree) {
//     // الخط القديم زي الأصل
//     return (
//       <svg
//         width={targetX + 10}
//         height={verticalLength + curveRadius}
//         style={{
//           position: "absolute",
//           top: `40px`,
//           left: "12px",
//           zIndex: 0,
//         }}
//       >
//         <path
//           d={`
//             M${startX} 0
//             L${startX} ${verticalLength}
//             Q${startX} ${verticalLength + curveRadius} ${
//             startX + curveRadius
//           } ${verticalLength + curveRadius}
//             L${targetX} ${verticalLength + curveRadius}
//           `}
//           stroke="#ddd"
//           strokeWidth="2"
//           fill="none"
//           strokeLinecap="round"
//         />
//       </svg>
//     );
//   } else {
//     // الشجرة الجديدة مع توزيع دقيق ونهاية بدون كيرف زائد
//     const baseHeight = newHeight; // ارتفاع التعليق الرئيسي أو الرد
//     const totalBranches = replies.length;
//     const branchSpacing = repliesHeight / totalBranches || 40; // توزيع بناءً على ارتفاع الردود
//     const branches = replies.map((_, index) => ({
//       y: baseHeight + index * branchSpacing, // توزيع ديناميكي
//       xEnd: targetX + 20,
//     }));
//     const lastBranchY = branches[branches.length - 1].y; // آخر فرع

//     return (
//       <svg
//         width={targetX + 50}
//         height={lastBranchY + 20}
//         style={{ position: "absolute", top: `40px`, left: "12px", zIndex: 0 }}
//       >
//         {/* الساق الرئيسي ينتهي عند آخر فرع بدون كيرف زائد */}
//         <path
//           d={`
//             M${startX} 0
//             L${startX} ${lastBranchY}
//           `}
//           stroke="#4a704a"
//           strokeWidth="3"
//           fill="none"
//           strokeLinecap="round"
//         />
//         {/* الفروع الأفقية أمام UserAvatar */}
//         {branches.map((branch, index) => (
//           <path
//             key={index}
//             d={`M${startX} ${branch.y} L${branch.xEnd} ${branch.y}`}
//             stroke="#4a704a"
//             strokeWidth="2"
//             fill="none"
//             strokeLinecap="round"
//           />
//         ))}
//       </svg>
//     );
//   }
// };

// export default TreeLineSVG;

const TreeLineSVG = ({ height, showNewTree, branchPositions }) => {
  const startX = 12;
  const verticalLength = Math.abs(height);
  const curveRadius = 10;
  const targetX = 45;

  if (!verticalLength) return null;

  if (!showNewTree) {
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
          d={`M${startX} 0 L${startX} ${verticalLength} Q${startX} ${
            verticalLength + curveRadius
          } ${startX + curveRadius} ${
            verticalLength + curveRadius
          } L${targetX} ${verticalLength + curveRadius}`}
          stroke="#ddd"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    );
  } else {
    if (!branchPositions.length) return null;
    const branchOffset = 35;
    const lastY = Math.max(...branchPositions) - branchOffset;
    return (
      <svg
        width={targetX + 50}
        height={lastY + 20}
        style={{ position: "absolute", top: `40px`, left: "12px", zIndex: 0 }}
      >
        <path
          d={`M${startX} 0 L${startX} ${lastY}`}
          stroke="#4a704a"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {branchPositions.map((y, index) => (
          <path
            key={index}
            d={`M${startX} ${y - branchOffset} 
        Q${startX + 20} ${y - branchOffset + 10} 
        ${targetX + 20} ${y - branchOffset}`}
            stroke="#4a704a"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        ))}
      </svg>
    );
  }
};

export default TreeLineSVG;
