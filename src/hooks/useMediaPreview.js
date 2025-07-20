import { useEffect } from "react";

/**
 * Custom hook to generate preview URLs for uploaded media files.
 * Automatically revokes URLs on cleanup to avoid memory leaks.
 */

export function useMediaPreview(mediaFiles, setPreviews) {
  // Update previews whenever mediaFiles change
  useEffect(() => {
    const newPreviews = mediaFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setPreviews(newPreviews);

    // Cleanup: revoke object URLs when component unmounts or files change
    return () => {
      newPreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [mediaFiles, setPreviews]);
}
