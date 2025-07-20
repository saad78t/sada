import supabase from "./supabaseClient";

export async function getComments(postId) {
  const { data, error } = await supabase
    .from("comments")
    .select("*, users(username)")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error("Error fetching comments");
  }

  return data;
}

export async function getAllComments() {
  const { data, error } = await supabase
    .from("comments")
    .select("*, users(username)")
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error("Error fetching all comments");
  }

  return data;
}

export const addComment = async (postId, content, parentId = null) => {
  const { data, error } = await supabase
    .from("comments")
    .insert([
      {
        post_id: postId,
        content,
        parent_comment_id: parentId,
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
};

//This is the old deletion method that used to delete the comment from the database. I will keep it as a reference.
// export const deleteComment = async (commentId) => {
//   const { error } = await supabase
//     .from("comments")
//     .delete()
//     .eq("id", commentId);
//   if (error) {
//     throw error;
//   }
// };

export const deleteComment = async (commentId) => {
  const { error } = await supabase
    .from("comments")
    .update({ is_deleted: true })
    .eq("id", commentId);
  if (error) throw error;
};
