import supabase from "../services/supabaseClient";

export async function createSignedUrls(arrayOfFiles) {
  if (arrayOfFiles.length === 0) return [];
  let signedUrls = [];
  try {
    const results = await Promise.all(
      arrayOfFiles.map((file) =>
        supabase.storage.from("post-media").createSignedUrl(file, 31536000)
      )
    );
    signedUrls = results.filter((result) => !result.error);
    return signedUrls;
  } catch (e) {
    console.error("Error creating signed links:", e.message);
    return [];
  }
}

// We use batching (processing files in chunks of `batchSize`) instead of running all uploads in one Promise.all.
// This prevents overloading the server or network when handling a large number of files (e.g., 50+ uploads).
// Each batch runs in parallel internally, but batches are executed sequentially, giving us better control
// over performance, avoiding timeouts, and keeping the app more scalable compared to a single massive Promise.all.
export async function uploadInBatches(files, source, batchSize = 5) {
  let results = [];
  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map((file, index) =>
        // supabase.storage.from("post-media").upload(file, source[i + index])
        supabase.storage.from("post-media").upload(file, source[i + index])
      )
    );
    results.push(...batchResults);
  }
  return results;
}

/**
 * supabase.storage.from("bucket-name").upload(
  fileName,   // The name/path to store this file in the storage bucket (e.g., "images/photo1.jpg")
  fileData    // The actual file content (File, Blob, or Buffer) that will be uploaded under this name
)
 *
 * مثال مهم جدا لشرح هذا الجزء source[i + index]
 *
 * files = ["file1.jpg","file2.jpg","file3.jpg","file4.jpg","file5.jpg",
         "file6.jpg","file7.jpg","file8.jpg","file9.jpg","file10.jpg",
         "file11.jpg","file12.jpg"];
source = [f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12]; // الملفات نفسها
batchSize = 5;
الدورة الأولى: i = 0, batch = ["file1.jpg","file2.jpg","file3.jpg","file4.jpg","file5.jpg"]
index=0 → source[0 + 0] = f1

index=1 → source[0 + 1] = f2

index=2 → source[0 + 2] = f3

index=3 → source[0 + 3] = f4

index=4 → source[0 + 4] = f5

الدورة الثانية: i = 5, batch = ["file6.jpg","file7.jpg","file8.jpg","file9.jpg","file10.jpg"]
index=0 → source[5 + 0] = f6

index=1 → source[5 + 1] = f7

index=2 → source[5 + 2] = f8

index=3 → source[5 + 3] = f9

index=4 → source[5 + 4] = f10

الدورة الثالثة: i = 10, batch = ["file11.jpg","file12.jpg"]
index=0 → source[10 + 0] = f11

index=1 → source[10 + 1] = f12

🔑 الخلاصة:

كل batch ترفع بالتوازي الملفات الموجودة فيها.

استخدام i + index يضمن أن كل اسم ملف من files يرتبط بالملف الصحيح من source.

آخر دورة ممكن يكون فيها أقل من batchSize (هنا فقط عنصرين)، وهذا طبيعي وآمن مع slice.
 */

export async function removeUploadedFiles(mediaFiles) {
  if (!mediaFiles || mediaFiles.length === 0) return;
  const { data, error } = await supabase.storage
    .from("post-media")
    .remove(mediaFiles);
  if (error) {
    console.error("Error deleting files:", error.message);
    throw new Error(`Failed to delete files: ${error.message}`);
  }

  return data || [];
}

export async function checkAllFiles(filesArray, logMessage, errorMessage) {
  if (filesArray.length === 0) {
    await removeUploadedFiles(filesArray);
    console.error(logMessage);
    throw new Error(errorMessage);
  }
}
