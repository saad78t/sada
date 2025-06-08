const TreeLineSVG = ({ depth }) => {
  const avatarHeight = 40;
  const verticalLength = 50;
  const curveRadius = 10; // هذا نصف قطر الكيرف
  const targetX = 45;

  const topOffset = depth === 0 ? avatarHeight : 0;
  const leftOffset = depth === 0 ? 12 : 0;

  return (
    <svg
      width={targetX + 10}
      height={verticalLength + curveRadius}
      style={{
        position: "absolute",
        top: `${topOffset}px`,
        left: `${leftOffset}px`,
      }}
    >
      <path
        d={`
          M10 0
          L10 ${verticalLength}
          Q10 ${verticalLength + curveRadius} ${10 + curveRadius} ${
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
