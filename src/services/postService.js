import supabase from "./supabaseClient";

export async function getPosts() {
  let { data: posts, error } = await supabase
    .from("posts")
    .select("*, users(username, profile_picture_url)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return posts;
}

export async function getPostById(id) {
  const { data, error } = await supabase
    .from("posts")
    .select("*, users(username, profile_picture_url)")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching post:", error);
    throw new Error("Failed to load post");
  }

  return data;
}
