export function formatCount(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num;
}

export function timeAgo(date) {
  const now = new Date();
  const past = new Date(date);

  if (isNaN(past)) return "";

  const seconds = Math.floor((now - past) / 1000);
  if (seconds < 60) return `${seconds}s`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d`;

  // لو أكثر من شهر، نعرض التاريخ
  const optionsSameYear = { month: "short", day: "numeric" };
  const optionsDiffYear = { month: "short", day: "numeric", year: "numeric" };

  if (now.getFullYear() === past.getFullYear()) {
    return past.toLocaleDateString("en-US", optionsSameYear);
  } else {
    return past.toLocaleDateString("en-US", optionsDiffYear);
  }
}

export const resetVideos = (videos) => {
  videos.forEach((v) => {
    v.pause();
    v.onended = null;
    v.currentTime = 0;
  });
};

/*
//الشكل القديم والاصلي لحذف التعليق اذاك لم يكن لديه ردود وسيتم استخدام النسخه ادناه لكي يتم العمل بطرق مختلفه اذا كانت ماب او مصفوفه
const isThreadFullyDeleted = (comment, comments) => {
  if (!comment.is_deleted) return false;

  const replies = comments?.filter((c) => c.parent_comment_id === comment.id);
  if (!replies || replies.length === 0) return true;

  return replies.every((reply) => isThreadFullyDeleted(reply, comments));
};

*/

export const isThreadFullyDeleted = (comment, repliesSource) => {
  if (!comment?.is_deleted) return false;

  let replies = [];

  if (repliesSource instanceof Map) {
    replies = repliesSource.get(comment.id) || [];
  } else if (Array.isArray(repliesSource)) {
    replies = repliesSource.filter((c) => c.parent_comment_id === comment.id);
  }

  if (!replies || replies.length === 0) return true;

  return replies.every((reply) => isThreadFullyDeleted(reply, repliesSource));
};

export const getSizeByDepth = (depth, type = "avatar") => {
  switch (type) {
    case "avatar":
      if (depth === 0) return "40px";
      if (depth === 1) return "32px";
      if (depth === 2) return "28px";
      return "24px"; // أي عمق أكبر

    case "deletedavatar": // ✅ مخصص للأفاتار المحذوف
      if (depth === 0) return "40";
      if (depth === 1) return "32";
      return "28";
    case "username":
      if (depth === 0) return "16px";
      if (depth === 1) return "14px";
      return "13px";
    case "text":
      if (depth === 0) return "18px";
      if (depth === 1) return "17px";
      return "15px";
    case "actions":
      if (depth === 0) return "16px";
      return "14px";
    case "deletedtext":
      if (depth === 0) return "20px";
      if (depth === 1) return "18px";
      return "17px";
    case "commentitemreplyformwidth":
      if (depth === 0 || depth === 1) return "250px";
      if (depth === 2 || depth === 3) return "230px";
      if (depth === 4) return "200px";
      if (depth === 5) return "190px";
      return "160px";
    case "commentitemtext":
      if (depth === 0) return "16px";
      return "15px";
    case "commentitemrepliescontainer":
      if (depth === 0) return "40px";
      if (depth === 1) return "35px";
      return "25px";
    case "commentitemreplyformgap":
      if (depth === 0) return "0.75rem";
      return "0.1rem";
    case "commentitemreplyformbutton":
      if (depth === 0) return "2rem";
      if (depth === 1 || depth === 2) return "1rem";
      return "-0.5rem";
    default:
      return "14px";
  }
};
