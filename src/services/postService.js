import {
  checkAllFiles,
  createSignedUrls,
  removeUploadedFiles,
  uploadInBatches,
} from "../utils/postHelpers";
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

export async function createPost(newPost) {
  const mediaNames = newPost.media_urls.map((url) =>
    `${Math.random()}-${url.name}`.replaceAll("/", "").replaceAll(" ", "")
  );

  // 1.A Upload media without batches as it is suitable for a small number of files.
  // const results = await Promise.all(
  //   mediaNames.map((el, i) => {
  //     return supabase.storage
  //       .from("post-media")
  //       .upload(el, newPost.media_urls[i]);
  //   })
  // );

  // 1.B We upload files in batches to prevent server/network overload, as uploading 200+ files at once with the old Promise.all approach could cause failures or interruptions.
  const results = await uploadInBatches(mediaNames, newPost.media_urls);

  // Collect successful files
  const validMediaNames = results
    .map((result, i) => (result.error === null ? mediaNames[i] : null))
    .filter((name) => name !== null);

  //Check the file that contains the error
  results.forEach((result, index) => {
    if (result.error) {
      console.error(
        "File upload error:",
        mediaNames[index],
        result.error.message
      );
    }
  });

  // Check if all files failed to upload
  checkAllFiles(
    validMediaNames,
    "Failed to upload all files",
    "No files were uploaded successfully"
  );

  // Create signed links for successful files only
  let signedUrls;
  try {
    signedUrls = await createSignedUrls(validMediaNames);
  } catch (e) {
    await removeUploadedFiles(validMediaNames);
    console.error("Error creating signed links:", e.message);
    throw new Error(`Failed to create links: ${e.message}`);
  }

  // Extract signed links
  //1 const validSignedUrls = signedUrls.map((el) => el.data.signedUrl);

  //2. Extract signed links
  // const validSignedUrls = signedUrls
  //   .map((el, index) => {
  //     if (!el || el.error) {
  //       console.error(
  //         "Error creating signed link:",
  //         validMediaNames[index],
  //         el?.error?.message || "Invalid result"
  //       );
  //       return null;
  //     }
  //     return el.data?.signedUrl || null;
  //   })
  //   .filter((url) => url !== null);

  //3. استخدمنا reduce بدلاً من map+filter لأنه يجمع القيم الصحيحة مباشرةً بدون إنشاء مصفوفة مؤقتة فيها null
  const validSignedUrls = signedUrls.reduce((accumulator, el, i) => {
    if (!el || el.error) {
      console.error(
        "Error creating signed link:",
        validMediaNames[i],
        el?.error?.message || "Invalid result"
      );
      return accumulator;
    }
    return el.data?.signedUrl
      ? [...accumulator, el.data.signedUrl]
      : accumulator;
  }, []);

  // Check if all links failed to be created
  // await checkAllFiles(
  //   validSignedUrls,
  //   validMediaNames,
  //   "Failed to create all signed links",
  //   "No signed links were created"
  // );

  // 2. insert title and content from react hook form
  const { data, error } = await supabase
    .from("posts")
    .insert([
      {
        ...newPost,
        media_urls: validSignedUrls.length > 0 ? validSignedUrls : null,
      },
    ])
    .select();

  if (error) {
    // If the post creation fails, we delete the files we uploaded.
    await removeUploadedFiles(validMediaNames);
    console.error("Error creating post:", error);
    throw new Error(`Failed to create post: ${error.message}`);
  }

  return data;
}

/*
// the old function of deleting post which was depending on hard delete
export async function deletePost(postId) {
  const { error } = await supabase.from("posts").delete().eq("id", postId);

  if (error) {
    console.error("Error deleting post:", error);
    throw new Error("Failed to delete post");
  }
}
  */

export async function deletePost(postId) {
  const { error } = await supabase
    .from("posts")
    .update({ is_deleted: true })
    .eq("id", postId);

  if (error) {
    console.error("Error deleting post:", error);
    throw new Error("Failed to delete post");
  }
}
