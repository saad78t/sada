// import PhotoModalOverlay from "../components/PhotoModalPages/PhotoModalOverlay";
// import PhotoModalImageSection from "../components/PhotoModalPages/PhotoModalImageSection";
// import PhotoModalInfoSection from "../components/PhotoModalPages/PhotoModalInfoSection";
// import { useParams } from "react-router-dom";
// import Spinner from "../Shared/Spinner";
// import { usePost } from "../hooks/usePost";
// import { useMemo } from "react";
// import { useGetLikesMap } from "../hooks/useGetLikesMap";

// const PhotoModal = () => {
//   const { id } = useParams();
//   const { post, isLoading, error } = usePost(id);

//   const postIds = useMemo(() => [Number(id)], [id]);
//   const { likesMap, isLoading: likesLoading } = useGetLikesMap("post", postIds);

//   if (isLoading) return <Spinner />;
//   if (error || !post) return <p>Error loading post</p>;

//   return (
//     <PhotoModalOverlay>
//       <PhotoModalImageSection post={post} />
//       <PhotoModalInfoSection
//         post={post}
//         likesMap={likesMap}
//         likesLoading={likesLoading}
//       />
//     </PhotoModalOverlay>
//   );
// };

// export default PhotoModal;

import PhotoModalOverlay from "../components/PhotoModalPages/PhotoModalOverlay";
import PhotoModalImageSection from "../components/PhotoModalPages/PhotoModalImageSection";
import PhotoModalInfoSection from "../components/PhotoModalPages/PhotoModalInfoSection";
import { useParams } from "react-router-dom";
import Spinner from "../Shared/Spinner";
import { usePost } from "../hooks/usePost";
import { useCachedPostLikes } from "../hooks/useCachedPostLikes";

const PhotoModal = () => {
  const { id } = useParams();
  const { post, isLoading, error } = usePost(id);

  // const postIds = useMemo(() => [Number(id)], [id]);
  // const { likesMap, isLoading: likesLoading } = useGetLikesMap("post", postIds);

  /*
  const queryClient = useQueryClient();

  // نحاول نجيب اللايكات من الكاش العام (إذا المستخدم إجه من الصفحة الرئيسية)
  const cachedLikesMap = queryClient.getQueryData(["likes-map", "post"]);

  // ثم نفلتر فقط لايكات البوست المطلوب (بـ id)
  const cachedLikesForThisPost = cachedLikesMap?.get?.(Number(id));

  const { likesMap, isLoading: likesLoading } = useGetLikesMap(
    "post",
    [Number(id)],
    {
      enabled: !cachedLikesForThisPost, // ما نستدعي الهوك إذا موجودة مسبقًا
    }
  );

  //خطوة وسيطة ضرورية حتى نخلي الكود موحد، ونتعامل مع الحالتين (كاش أو لا كاش) بنفس الطريقة. لان بوست اكشن يتوقع راح تدخل له Map
  const finalLikesMap = useMemo(() => {
    if (cachedLikesForThisPost) {
      const map = new Map();
      map.set(Number(id), cachedLikesForThisPost);
      return map;
    }
    return likesMap;
  }, [cachedLikesForThisPost, likesMap, id]);
*/
  const { finalLikesMap, likesLoading } = useCachedPostLikes(id);

  if (isLoading) return <Spinner />;
  if (error || !post) return <p>Error loading post</p>;

  return (
    <PhotoModalOverlay>
      <PhotoModalImageSection post={post} />
      <PhotoModalInfoSection
        post={post}
        likesMap={finalLikesMap}
        likesLoading={likesLoading}
      />
    </PhotoModalOverlay>
  );
};

export default PhotoModal;
