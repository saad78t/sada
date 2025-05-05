import supabase from "./supabaseClient";

export async function getPosts() {
  let { data: posts, error } = await supabase
    .from("posts")
    .select("*, users(username)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return posts;
}
