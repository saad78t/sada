import supabase from "./supabaseClient";
/**
 * 
 This code was only returning 1000 likes to the number even though there are 2000 in Superbase. The reason is that Supabase has a default limit on the number of rows it can return in a single query, and this limit is 1000 rows.
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
   */

export async function getLikes(postId) {
  let allLikes = [];
  let from = 0;
  const batchSize = 1000; //The number of likes we will request in each batch is 1000 because it is the maximum that Supabase allows.

  while (true) {
    const { data, error } = await supabase
      .from("likes")
      .select("*")
      .eq("post_id", postId)
      .range(from, from + batchSize - 1); //It means to get the data from number from to number from + 999 (meaning 1000 rows).

    if (error) {
      throw new Error(error.message);
    }

    allLikes = allLikes.concat(data); //We add the likes we brought in this batch to the full array allLikes.

    if (data.length < batchSize) break;
    from += batchSize; //We increase the starting number from by 1000, so that in the next cycle we get the next batch (rows from 1000 to 1999, and so on).
  }

  return allLikes;
}
