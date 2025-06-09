const TreeLineSVG = ({ height }) => {
  const newHeight = Math.abs(height);
  const startX = 12; //Start of left line on X-axis.
  const verticalLength = newHeight; //The length of the vertical part that goes down
  const curveRadius = 10; //radius of curvature (curve).
  const targetX = 45; //End of horizontal line (on X-axis).

  if (!newHeight) return null;
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
