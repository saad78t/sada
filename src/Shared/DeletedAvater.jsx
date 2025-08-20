// export const DeletedAvatar = () => (
//   <svg
//     width="40"
//     height="40"
//     viewBox="0 0 40 40"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <circle cx="20" cy="20" r="20" fill="#ccc" />
//     <text
//       x="50%"
//       y="50%"
//       dominantBaseline="middle"
//       textAnchor="middle"
//       fontSize="18"
//       fill="white"
//       fontFamily="Arial, sans-serif"
//     >
//       ?
//     </text>
//   </svg>
// );

import { getSizeByDepth } from "../utils/helpers";

export const DeletedAvatar = ({ $depth = 0 }) => {
  const raw = getSizeByDepth($depth, "deletedavatar") || "40";
  const size = typeof raw === "number" ? raw : parseInt(raw, 10) || 40;

  const fontSize = Math.round(size * 0.45);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="20" cy="20" r="20" fill="#888" />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize={fontSize}
        fill="#fff"
        fontFamily="Inter, Arial, sans-serif"
      >
        ?
      </text>
    </svg>
  );
};
