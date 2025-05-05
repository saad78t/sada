import supabase from "./supabaseClient";

export async function getLikes(postId) {
  const { data, error } = await supabase
    .from("likes")
    .select("*")
    .eq("post_id", postId);

  if (error) {
    console.error("Error fetching likes:", error.message);
    throw new Error("Failed to fetch likes");
  }

  return data;
}
