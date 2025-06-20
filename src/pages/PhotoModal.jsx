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
  top: 0; //top: 0 and left: 0 make the element start at the very top left of the screen.
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex; //So we can easily control the positioning of the internal elements.
  z-index: 1000;
`;

const ImageSection = styled.div`
  position: relative;
  flex: 2; //It means that it takes up twice the space compared to any other element in the same flex container. The ImageSection takes up two-thirds of the screen, while the InfoSection takes up only one-third.
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
  border-radius: 50%; //Converts the button to a perfect circle.
  z-index: 30;
`;

const ArrowLeft = styled.button`
  position: absolute;
  left: 1rem;
  top: 50%; //Places the button at the center of the container element's height.
  transform: translateY(-50%);
  font-size: 2rem;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 40;
`;

const ArrowRight = styled(ArrowLeft)`
  left: auto; //يلغي تأثير left: 1rem; الموروثة //left: auto; معناها: "انسَ مكان اليسار، لا تستخدمه"،
  right: 1rem;
`;

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const PostContent = styled.p`
  direction: ${({ $lang }) => ($lang === "ar" ? "rtl" : "ltr")};
  text-align: start;
  padding-left: 3rem;
  text-align: start;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

const handleReplySubmit = (content, parentId) => {
  console.log("رد جديد:", content, "على التعليق:", parentId);
  // هنا تقدر تضيف POST للـ API أو تحديث الحالة مثلاً
};

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

  const lang = /[\u0600-\u06FF]/.test(post?.content) ? "ar" : "en";

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

    playerRef.current.pause();
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

          <VideoJsPlayer options={videoJsOptions} onReady={handlePlayerReady} />
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
        {/* <p style={{ marginTop: "1rem" }}>{post.content}</p> */}
        <PostContent $lang={lang}>{post.content}</PostContent>
        <PostActions postId={post.id} />
        <div style={{ marginTop: "1rem" }}>
          {comments.map((comment) =>
            !comment.parent_comment_id ? (
              <CommentItem
                key={comment.id}
                comment={comment}
                comments={comments}
                onReplySubmit={handleReplySubmit}
              />
            ) : null
          )}
        </div>
      </InfoSection>
    </Overlay>
  );
};

export default PhotoModal;
