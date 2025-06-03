// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import styled from "styled-components";
// import { getPostById } from "../services/postService";
// import { getComments } from "../services/commentService";
// import PostHeader from "../components/Post/PostHeader";
// import PostActions from "../components/Post/PostActions";
// import Spinner from "../Shared/Spinner";
// import CommentItem from "../Comment/CommentItem";
// import { X } from "lucide-react";
// import { timeAgo } from "../utils/helpers";

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

// const StyledVideo = styled.video`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   border-radius: 8px;
//   background: #000;
// `;

// const StyledImage = styled.img`
//   max-width: 100%;
//   max-height: 100%;
//   object-fit: contain;
// `;

// const PhotoModal = () => {
//   const { id, photoIndex } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const returnToPost = sessionStorage.getItem("returnToPost");
//   const from = returnToPost || location.state?.from || "/";

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
//   const totalImages = post.media_urls?.length;

//   const isVideo = /\.(mp4|webm|ogg)/i.test(mediaUrl);

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       navigate(`/post/${id}/photo/${currentIndex - 1}`, {
//         state: { from },
//       });
//     }
//   };

//   const handleNext = () => {
//     if (currentIndex < totalImages - 1) {
//       navigate(`/post/${id}/photo/${currentIndex + 1}`, {
//         state: { from },
//       });
//     }
//   };

//   const handleClose = () => {
//     document.querySelectorAll("video").forEach((v) => {
//       v.pause();
//       v.currentTime = 0;
//     });

//     //navigate(from, { replace: true }); // Replace history to avoid photo routes
//     navigate(from);
//     sessionStorage.removeItem("returnToPost");
//   };

//   return (
//     <Overlay>
//       <ImageSection onClick={(e) => e.stopPropagation()}>
//         {currentIndex > 0 && <ArrowLeft onClick={handlePrev}>←</ArrowLeft>}

//         <CloseButton onClick={handleClose}>
//           <X />
//         </CloseButton>
//         {isVideo ? (
//           <StyledVideo
//             key={mediaUrl}
//             src={mediaUrl}
//             controls
//             preload="metadata"
//             autoPlay
//             onError={(e) => console.error("Video failed:", mediaUrl, e.message)}
//           />
//         ) : (
//           <StyledImage
//             key={mediaUrl}
//             src={mediaUrl}
//             alt="Post media"
//             onError={(e) => console.error("Image failed:", mediaUrl, e.message)}
//           />
//         )}

//         {currentIndex < totalImages - 1 && (
//           <ArrowRight onClick={handleNext}>→</ArrowRight>
//         )}
//       </ImageSection>

//       <InfoSection onClick={(e) => e.stopPropagation()}>
//         <PostHeader
//           username={post.users?.username || post.username}
//           avatarUrl={post.users?.profile_picture_url}
//           createdAt={timeAgo(post.created_at)}
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

import videojs from "video.js";
import VideoJsPlayer from "../components/Post/VideoJsPlayer";
import { useRef } from "react";

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
  width: 100%;
  height: 100%;
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

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  background: #000;
`;

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const PhotoModal = () => {
  const { id, photoIndex } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const returnToPost = sessionStorage.getItem("returnToPost");
  const from = returnToPost || location.state?.from || "/";
  const playerRef = useRef(null);

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
  const totalImages = post.media_urls?.length;

  const isVideo = /\.(mp4|webm|ogg)/i.test(mediaUrl);

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
    document.querySelectorAll("video").forEach((v) => {
      v.pause();
      v.currentTime = 0;
    });

    //navigate(from, { replace: true }); // Replace history to avoid photo routes
    navigate(from);
    sessionStorage.removeItem("returnToPost");
  };

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: false,
    loop: true,
    muted: true,
    controlBar: {
      skipButtons: {
        forward: 10,
        backward: 10,
      },
    },
    sources: [
      {
        src: mediaUrl,
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <Overlay>
      <ImageSection onClick={(e) => e.stopPropagation()}>
        {currentIndex > 0 && <ArrowLeft onClick={handlePrev}>←</ArrowLeft>}

        <CloseButton onClick={handleClose}>
          <X />
        </CloseButton>
        {isVideo ? (
          // <StyledVideo
          //   key={mediaUrl}
          //   src={mediaUrl}
          //   controls
          //   preload="metadata"
          //   autoPlay
          //   onError={(e) => console.error("Video failed:", mediaUrl, e.message)}
          // />

          <VideoJsPlayer
            options={videoJsOptions}
            onReady={handlePlayerReady}
            srcUrl={mediaUrl}
          />
        ) : (
          <StyledImage
            key={mediaUrl}
            src={mediaUrl}
            alt="Post media"
            onError={(e) => console.error("Image failed:", mediaUrl, e.message)}
          />
        )}

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

// code video.js

// import React from "react";
// import videojs from "video.js";
// import "video.js/dist/video-js.css";

// export function Player() {
//   const playerRef = React.useRef(null);

//   const videoJsOptions = {
//     autoplay: true,
//     controls: true,
//     responsive: true,
//     fluid: true,
//     loop: true,
//     muted: true,
//     controlBar: {
//       skipButtons: {
//         forward: 5,
//         backward: 10,
//       },
//     },
//     sources: [
//       {
//         src: "/Muchachos.mp4",
//         type: "video/mp4",
//       },
//     ],
//   };

//   const handlePlayerReady = (player) => {
//     playerRef.current = player;

//     // You can handle player events here, for example:
//     player.on("waiting", () => {
//       videojs.log("player is waiting");
//     });

//     player.on("dispose", () => {
//       videojs.log("player will dispose");
//     });
//   };

//   return (
//     <>
//       <div>Rest of app here</div>
//       <PhotoModal options={videoJsOptions} onReady={handlePlayerReady} />
//       <div>Rest of app here</div>
//     </>
//   );
// }

// function PhotoModal(props) {
//   const videoRef = React.useRef(null);
//   const playerRef = React.useRef(null);
//   const { options, onReady } = props;

//   React.useEffect(() => {
//     // Make sure Video.js player is only initialized once
//     if (!playerRef.current) {
//       // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
//       const videoElement = document.createElement("video-js");

//       videoElement.classList.add("vjs-big-play-centered");
//       videoRef.current.appendChild(videoElement);

//       const player = (playerRef.current = videojs(videoElement, options, () => {
//         videojs.log("player is ready");
//         onReady && onReady(player);
//       }));

//       // You could update an existing player in the `else` block here
//       // on prop change, for example:
//     } else {
//       const player = playerRef.current;

//       player.autoplay(options.autoplay);
//       player.src(options.sources);
//     }
//   }, [options, videoRef, onReady]);

//   // Dispose the Video.js player when the functional component unmounts
//   React.useEffect(() => {
//     const player = playerRef.current;

//     return () => {
//       if (player && !player.isDisposed()) {
//         player.dispose();
//         playerRef.current = null;
//       }
//     };
//   }, [playerRef]);

//   return (
//     <div data-vjs-player>
//       <div ref={videoRef} />
//     </div>
//   );
// }

// export default PhotoModal;
