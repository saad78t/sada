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
          // stroke="#4a704a"
          stroke="#ddd"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {branchPositions.map((y, index) => (
          <path
            key={index}
            d={`M${startX} ${y - branchOffset} 
        Q${startX + 20} ${y - branchOffset + 10} 
        ${targetX + 20} ${y - branchOffset}`}
            // stroke="#4a704a"
            stroke="#ddd"
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
