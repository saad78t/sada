// import { useParams, useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import styled from "styled-components";
// import { getPostById } from "../services/postService";
// import { getComments } from "../services/commentService";
// import PostHeader from "../components/Post/PostHeader";
// import PostActions from "../components/Post/PostActions";
// import Spinner from "../Shared/Spinner";
// import CommentItem from "../Comment/CommentItem";
// import { X } from "lucide-react";

// const Overlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.7);
//   display: flex;
//   z-index: 1000;
// `;

// const ImageSection = styled.div`
//   position: relative;
//   flex: 2;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: black;

//   img {
//     max-width: 100%;
//     max-height: 100%;
//   }
// `;

// const InfoSection = styled.div`
//   flex: 1;
//   background: white;
//   padding: 1rem;
//   overflow-y: auto;
//   position: relative;
// `;

// const CloseButton = styled.button`
//   position: absolute;
//   top: 1rem;
//   left: 1rem;
//   background: rgba(0, 0, 0, 0.6);
//   border: none;
//   cursor: pointer;
//   color: white;
//   padding: 0.3rem;
//   border-radius: 50%;
//   z-index: 20;
// `;

// const ArrowLeft = styled.button`
//   position: absolute;
//   left: 1rem;
//   top: 50%;
//   transform: translateY(-50%);
//   font-size: 2rem;
//   color: white;
//   background: none;
//   border: none;
//   cursor: pointer;
//   z-index: 10;
// `;

// const ArrowRight = styled(ArrowLeft)`
//   left: auto;
//   right: 1rem;
// `;

// const PhotoModal = () => {
//   const { id, photoIndex } = useParams();
//   const navigate = useNavigate();
//   const {
//     data: post,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["post", id],
//     queryFn: () => getPostById(id),
//     enabled: !!id,
//   });

//   const { data: comments = [] } = useQuery({
//     queryKey: ["comments", id],
//     queryFn: () => getComments(id),
//     enabled: !!id,
//   });

//   if (isLoading) return <Spinner />;
//   if (error || !post) return <p>Error loading post</p>;

//   const mediaUrl = post.media_urls?.[photoIndex];
//   const currentIndex = parseInt(photoIndex);
//   const totalImages = post.media_urls?.length || 0;

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       navigate(`/post/${id}/photo/${currentIndex - 1}`);
//     }
//   };

//   const handleNext = () => {
//     if (currentIndex < totalImages - 1) {
//       navigate(`/post/${id}/photo/${currentIndex + 1}`);
//     }
//   };

//   return (
//     <Overlay>
//       <ImageSection onClick={(e) => e.stopPropagation()}>
//         {currentIndex > 0 && <ArrowLeft onClick={handlePrev}>←</ArrowLeft>}

//         <CloseButton
//           onClick={(e) => {
//             e.stopPropagation();
//             navigate("/", { replace: true }); // Preserve scroll position after closing photo modal
//           }}
//         >
//           <X />
//         </CloseButton>

//         {mediaUrl && <img src={mediaUrl} alt="Post media" />}

//         {currentIndex < totalImages - 1 && (
//           <ArrowRight onClick={handleNext}>→</ArrowRight>
//         )}
//       </ImageSection>

//       <InfoSection onClick={(e) => e.stopPropagation()}>
//         <PostHeader
//           username={post.users?.username || post.username}
//           avatarUrl={post.users?.profile_picture_url}
//           createdAt={post.created_at}
//           postId={post.id}
//         />
//         <p style={{ marginTop: "1rem" }}>{post.content}</p>
//         <PostActions postId={post.id} />

//         <div style={{ marginTop: "1rem" }}>
//           {comments.map((comment) => (
//             <CommentItem key={comment.id} comment={comment} />
//           ))}
//         </div>
//       </InfoSection>
//     </Overlay>
//   );
// };

// export default PhotoModal;
/*
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getPostById } from "../services/postService";
import { getComments } from "../services/commentService";
import PostHeader from "../components/Post/PostHeader";
import PostActions from "../components/Post/PostActions";
import Spinner from "../Shared/Spinner";
import CommentItem from "../Comment/CommentItem";
import { X } from "lucide-react";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  z-index: 1000;
`;

const ImageSection = styled.div`
  position: relative;
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const InfoSection = styled.div`
  flex: 1;
  background: white;
  padding: 1rem;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  cursor: pointer;
  color: white;
  padding: 0.3rem;
  border-radius: 50%;
  z-index: 20;
`;

const ArrowLeft = styled.button`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
`;

const ArrowRight = styled(ArrowLeft)`
  left: auto;
  right: 1rem;
`;

const PhotoModal = () => {
  const { id, photoIndex } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
    enabled: !!id,
  });

  const { data: comments = [] } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getComments(id),
    enabled: !!id,
  });

  if (isLoading) return <Spinner />;
  if (error || !post) return <p>Error loading post</p>;

  const mediaUrl = post.media_urls?.[photoIndex];
  const currentIndex = parseInt(photoIndex);
  const totalImages = post.media_urls?.length || 0;

  const handlePrev = () => {
    if (currentIndex > 0) {
      navigate(`/post/${id}/photo/${currentIndex - 1}`, {
        state: { from },
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < totalImages - 1) {
      navigate(`/post/${id}/photo/${currentIndex + 1}`, {
        state: { from },
      });
    }
  };

  return (
    <Overlay>
      <ImageSection onClick={(e) => e.stopPropagation()}>
        {currentIndex > 0 && <ArrowLeft onClick={handlePrev}>←</ArrowLeft>}

        <CloseButton
          onClick={(e) => {
            e.stopPropagation();
            navigate(from, { replace: true });
          }}
        >
          <X />
        </CloseButton>

        {mediaUrl && <img src={mediaUrl} alt="Post media" />}

        {currentIndex < totalImages - 1 && (
          <ArrowRight onClick={handleNext}>→</ArrowRight>
        )}
      </ImageSection>

      <InfoSection onClick={(e) => e.stopPropagation()}>
        <PostHeader
          username={post.users?.username || post.username}
          avatarUrl={post.users?.profile_picture_url}
          createdAt={post.created_at}
          postId={post.id}
        />
        <p style={{ marginTop: "1rem" }}>{post.content}</p>
        <PostActions postId={post.id} />

        <div style={{ marginTop: "1rem" }}>
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </InfoSection>
    </Overlay>
  );
};

export default PhotoModal;
*/

//كود معدل
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getPostById } from "../services/postService";
import { getComments } from "../services/commentService";
import PostHeader from "../components/Post/PostHeader";
import PostActions from "../components/Post/PostActions";
import Spinner from "../Shared/Spinner";
import CommentItem from "../Comment/CommentItem";
import { X } from "lucide-react";
import { timeAgo } from "../utils/helpers";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  z-index: 1000;
`;

const ImageSection = styled.div`
  position: relative;
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const InfoSection = styled.div`
  flex: 1;
  background: white;
  padding: 1rem;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  cursor: pointer;
  color: white;
  padding: 0.3rem;
  border-radius: 50%;
  z-index: 20;
`;

const ArrowLeft = styled.button`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2rem;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
`;

const ArrowRight = styled(ArrowLeft)`
  left: auto;
  right: 1rem;
`;

const PhotoModal = () => {
  const { id, photoIndex } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const returnToPost = sessionStorage.getItem("returnToPost");
  const from = returnToPost || location.state?.from || "/";

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
    enabled: !!id,
  });

  const { data: comments = [] } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getComments(id),
    enabled: !!id,
  });

  if (isLoading) return <Spinner />;
  if (error || !post) return <p>Error loading post</p>;

  const mediaUrl = post.media_urls?.[photoIndex];
  const currentIndex = parseInt(photoIndex);
  const totalImages = post.media_urls?.length || 0;

  const handlePrev = () => {
    if (currentIndex > 0) {
      navigate(`/post/${id}/photo/${currentIndex - 1}`, {
        state: { from },
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < totalImages - 1) {
      navigate(`/post/${id}/photo/${currentIndex + 1}`, {
        state: { from },
      });
    }
  };

  const handleClose = () => {
    navigate(from, { replace: true }); // Replace history to avoid photo routes
    sessionStorage.removeItem("returnToPost");
  };

  return (
    <Overlay>
      <ImageSection onClick={(e) => e.stopPropagation()}>
        {currentIndex > 0 && <ArrowLeft onClick={handlePrev}>←</ArrowLeft>}

        <CloseButton onClick={handleClose}>
          <X />
        </CloseButton>

        {mediaUrl && <img src={mediaUrl} alt="Post media" />}

        {currentIndex < totalImages - 1 && (
          <ArrowRight onClick={handleNext}>→</ArrowRight>
        )}
      </ImageSection>

      <InfoSection onClick={(e) => e.stopPropagation()}>
        <PostHeader
          username={post.users?.username || post.username}
          avatarUrl={post.users?.profile_picture_url}
          createdAt={timeAgo(post.created_at)}
          postId={post.id}
        />
        <p style={{ marginTop: "1rem" }}>{post.content}</p>
        <PostActions postId={post.id} />

        <div style={{ marginTop: "1rem" }}>
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </InfoSection>
    </Overlay>
  );
};

export default PhotoModal;
