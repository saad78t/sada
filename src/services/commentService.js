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
