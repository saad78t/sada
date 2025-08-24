//الحل الاول قبل اضافه العمق الى الشجره والى الصوره

// const TreeLineSVG = ({ height, showNewTree, branchPositions }) => {
//   const startX = 12;
//   const verticalLength = Math.abs(height);
//   const curveRadius = 10;
//   const targetX = 45;

//   if (!verticalLength) return null;

//   if (!showNewTree) {
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
//           d={`M${startX} 0 L${startX} ${verticalLength} Q${startX} ${
//             verticalLength + curveRadius
//           } ${startX + curveRadius} ${
//             verticalLength + curveRadius
//           } L${targetX} ${verticalLength + curveRadius}`}
//           stroke="#ddd"
//           strokeWidth="2"
//           fill="none"
//           strokeLinecap="round"
//         />
//       </svg>
//     );
//   } else {
//     if (!branchPositions.length) return null;
//     const branchOffset = 35;
//     const lastY = Math.max(...branchPositions) - branchOffset;
//     return (
//       <svg
//         width={targetX + 50}
//         height={lastY + 20}
//         style={{ position: "absolute", top: `40px`, left: "12px", zIndex: 0 }}
//       >
//         <path
//           d={`M${startX} 0 L${startX} ${lastY}`}
//           // stroke="#4a704a"
//           stroke="#ddd"
//           strokeWidth="2"
//           fill="none"
//           strokeLinecap="round"
//         />

//         {branchPositions.map((y, index) => (
//           <path
//             key={index}
//             d={`M${startX} ${y - branchOffset}
//         Q${startX + 20} ${y - branchOffset + 10}
//         ${targetX + 20} ${y - branchOffset}`}
//             // stroke="#4a704a"
//             stroke="#ddd"
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

//الحل الثاني بعد اضافه العمق الى الشجره الفروع في هذه الحاله تكون ملاصقه الى صوره المستخدم صاحب الرد
// import { getSizeByDepth } from "../utils/helpers";

// const TreeLineSVG = ({ height, showNewTree, branchPositions, depth = 0 }) => {
//   const curveRadius = 10;
//   const targetX = 40;

//   if (!height) return null;

//   // حجم صورة الأب
//   const parentAvatarSize = parseInt(getSizeByDepth(depth, "avatar"), 10);

//   // منتصف صورة الأب الفعلي
//   const startX = parentAvatarSize / 2;

//   // حجم ومنتصف ثابت بناءً على العمق 0 لتوحيد موقع الكيرف
//   const fixedAvatarSize = parseInt(getSizeByDepth(0, "avatar"), 10);
//   const fixedStartX = fixedAvatarSize / 2;

//   // تعويض الفرق في حجم الصورة لتوحيد ارتفاع النهاية
//   const depthOffset = fixedAvatarSize - parentAvatarSize;

//   // بداية الجذع من أسفل صورة الأب
//   const avatarOffset = parentAvatarSize;

//   // تعويض صغير ثابت حتى يبقى الكيرف بمحاذاة منتصف حرف V
//   const alignNudge = 2;

//   if (!showNewTree) {
//     const verticalLength = Math.abs(height) + alignNudge + depthOffset - 2; // نقصنا 2 بكسل لتوسيط الكيرف في حرف V

//     return (
//       <svg
//         width={targetX + 20}
//         height={verticalLength + curveRadius}
//         style={{
//           position: "absolute",
//           top: `${avatarOffset}px`,
//           left: "0px",
//           zIndex: 0,
//         }}
//       >
//         {/* الخط الذي يرسم الجذع من أسفل صورة الأب إلى منتصف زر عرض التعليقات (حرف V) */}
//         <path
//           d={`M${startX} 0
//              L${startX} ${verticalLength}
//              Q${startX} ${verticalLength + curveRadius}
//               ${fixedStartX + curveRadius} ${verticalLength + curveRadius}
//              L${targetX} ${verticalLength + curveRadius}`}
//           stroke="#ddd"
//           strokeWidth="2"
//           fill="none"
//           strokeLinecap="round"
//         />
//       </svg>
//     );
//   } else {
//     if (!branchPositions.length) return null;

//     // حجم صورة الأبناء (كلهم نفس العمق depth+1)
//     const childAvatarSize = parseInt(getSizeByDepth(depth + 1, "avatar"), 10);

//     // نصحّح فرق المنتصف: hook يضيف 16px ثابتة، نصححه إلى نصف صورة الابن
//     const centerCorrection = childAvatarSize / 2 - 16;

//     // الطول اللازم للجذع: أكبر فرع بعد التصحيح
//     const lastY =
//       Math.max(...branchPositions) +
//       centerCorrection -
//       avatarOffset +
//       alignNudge;

//     return (
//       <svg
//         width={targetX + 50}
//         height={lastY + 20}
//         style={{
//           position: "absolute",
//           top: `${avatarOffset}px`,
//           left: "0px",
//           zIndex: 0,
//         }}
//       >
//         {/* الجذع */}
//         <path
//           d={`M${startX} 0 L${startX} ${lastY}`}
//           stroke="#ddd"
//           strokeWidth="2"
//           fill="none"
//           strokeLinecap="round"
//         />

//         {/* الفروع بأسلوب فيسبوك مع انحناءة خفيفة للأسفل من الجذع ثم استقامة */}
//         {branchPositions.map((y, index) => {
//           const branchY = y + centerCorrection - avatarOffset;

//           return (
//             <path
//               key={index}
//               d={`M${startX} ${branchY}
//                  Q${startX + 15} ${branchY + 10}
//                   ${targetX + 20} ${branchY}`}
//               stroke="#ddd"
//               strokeWidth="2"
//               fill="none"
//               strokeLinecap="round"
//             />
//           );
//         })}
//       </svg>
//     );
//   }
// };

// export default TreeLineSVG;

//الحل الثالث ونسخه الفيسبوك وجميع الحلول اعلاه تعمل وسيتم ابقائها كريفرنس كمرجع للمستقبل
import { getSizeByDepth } from "../utils/helpers";

const TreeLineSVG = ({ height, showNewTree, branchPositions, depth = 0 }) => {
  const curveRadius = 16; // طول الكيرف
  const targetX = 40;

  if (!height) return null;

  // حجم صورة الأب
  const parentAvatarSize = parseInt(getSizeByDepth(depth, "avatar"), 10);

  // منتصف صورة الأب الفعلي
  const startX = parentAvatarSize / 2;

  // حجم ومنتصف ثابت للـ V
  const fixedAvatarSize = parseInt(getSizeByDepth(0, "avatar"), 10) - 6;
  const fixedStartX = fixedAvatarSize / 2;

  // تعويض فرق الحجم
  const depthOffset = fixedAvatarSize - parentAvatarSize;

  // بداية الجذع من أسفل صورة الأب
  const avatarOffset = parentAvatarSize;

  const alignNudge = 2;

  // -------------------- حالة الجذع (إلى حرف V) --------------------
  if (!showNewTree) {
    const verticalLength = Math.abs(height) + alignNudge + depthOffset - 2;

    return (
      <svg
        width={targetX + 20}
        height={verticalLength + curveRadius}
        style={{
          position: "absolute",
          top: `${avatarOffset}px`,
          left: "0px",
          zIndex: 0,
        }}
      >
        <path
          d={`M${startX} 0
             L${startX} ${verticalLength}
             Q${startX} ${verticalLength + curveRadius}
              ${fixedStartX + curveRadius} ${verticalLength + curveRadius}`}
          stroke="#ddd"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // -------------------- حالة الشجرة مع الفروع --------------------
  if (!branchPositions?.length) return null;

  // حجم صورة الأبناء
  const childAvatarSize = parseInt(getSizeByDepth(depth + 1, "avatar"), 10);

  // 🔹 نخلي الفرع يمر بمحاذاة منتصف صورة الابن لكن مع رفع بسيط (حتى لا يلمس الصورة)
  const centerCorrection = childAvatarSize / 2 - 30; // 4px مسافة فوق النص

  // الطول اللازم للجذع
  const lastY =
    Math.max(...branchPositions) + centerCorrection - avatarOffset + alignNudge;

  return (
    <svg
      width={targetX + 50}
      height={lastY + curveRadius + 20}
      style={{
        position: "absolute",
        top: `${avatarOffset}px`,
        left: "0px",
        zIndex: 0,
      }}
    >
      {/* الجذع */}
      <path
        d={`M${startX} 0 L${startX} ${lastY}`}
        stroke="#ddd"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* الفروع: نفس كيرف الـ V لكن متوجه للصور */}
      {branchPositions.map((y, index) => {
        const branchY = y + centerCorrection - avatarOffset;

        return (
          <path
            key={index}
            d={`M${startX} ${branchY}
               Q${startX} ${branchY + curveRadius}
                ${startX + curveRadius} ${branchY + curveRadius}`}
            stroke="#ddd"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
};

export default TreeLineSVG;
