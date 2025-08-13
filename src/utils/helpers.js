export function formatCount(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num;
}

// export function timeAgo(date) {
//   const seconds = Math.floor((new Date() - new Date(date)) / 1000);

//   let interval = Math.floor(seconds / 31536000);
//   if (interval >= 1)
//     return interval + (interval === 1 ? " year ago" : " years ago");

//   interval = Math.floor(seconds / 2592000);
//   if (interval >= 1)
//     return interval + (interval === 1 ? " month ago" : " months ago");

//   interval = Math.floor(seconds / 604800);
//   if (interval >= 1)
//     return interval + (interval === 1 ? " week ago" : " weeks ago");

//   interval = Math.floor(seconds / 86400);
//   if (interval >= 1)
//     return interval + (interval === 1 ? " day ago" : " days ago");

//   interval = Math.floor(seconds / 3600);
//   if (interval >= 1)
//     return interval + (interval === 1 ? " hour ago" : " hours ago");

//   interval = Math.floor(seconds / 60);
//   if (interval >= 1)
//     return interval + (interval === 1 ? " minute ago" : " minutes ago");

//   return "Just now";
// }

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
