// import styled from "styled-components";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { getPostById } from "../services/postService";
// import { getComments } from "../services/commentService";
// import PostHeader from "../components/Post/PostHeader";
// import PostContent from "../components/Post/PostContent";
// import PostActions from "../components/Post/PostActions";
// import Spinner from "../Shared/Spinner";
// import { ArrowLeft, ThumbsUp, MessageCircle } from "lucide-react";
// import { useState } from "react";
// import UserAvatar from "../components/Post/UserAvatar";

// const Container = styled.div`
//   max-width: 700px;
//   margin: 0 auto;
//   padding: 2rem 1rem;
// `;

// const FixedHeader = styled.div`
//   position: fixed;
//   top: 95px;
//   width: 100%;
//   max-width: 700px;
//   left: 50%;
//   transform: translateX(-50%);
//   z-index: 10;
//   background: rgba(94, 94, 94, 0.8);
//   display: flex;
//   align-items: center;
//   padding: 10px;
// `;

// const ArrowButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   margin-right: 5px;
//   color: #000000;
// `;

// const Text = styled.span`
//   color: white;
// `;

// const CommentContainer = styled.div`
//   border-left: ${({ $hasLine }) => ($hasLine ? "2px solid #28a745" : "none")};
//   padding-left: 0.75rem;
//   margin-bottom: 1rem;
// `;

// const CommentContent = styled.div`
//   cursor: pointer;
// `;

// const AuthorRow = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
// `;

// const UserName = styled.span`
//   font-weight: bold;
//   color: ${({ theme }) => theme.textColor};
// `;

// const PostDate = styled.span`
//   font-size: 0.85rem;
//   color: ${({ theme }) => theme.borderColor};
// `;

// const CommentText = styled.div`
//   margin: 0.3rem 0;
// `;

// const CommentActions = styled.div`
//   display: flex;
//   gap: 1rem;
//   align-items: center;
//   margin-top: 0.5rem;
// `;

// const ActionButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   gap: 0.3rem;
//   color: ${({ theme }) => theme.textColor};
//   font-size: 0.85rem;
// `;

// const ContentWrapper = styled.div`
//   max-width: 500px;
//   margin: 0 auto;
// `;

// const PostDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [expandedComments, setExpandedComments] = useState({});
//   const location = useLocation();
//   const from = location.state?.from || "/";

//   const {
//     data: post,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["post", id],
//     queryFn: () => getPostById(id),
//     enabled: !!id,
//   });

//   const { data: comments = [], isLoading: loadingComments } = useQuery({
//     queryKey: ["comments", id],
//     queryFn: () => getComments(id),
//   });

//   //prev stands for previous state, and comes automatically from React within setState
//   const toggleReplies = (commentId) => {
//     setExpandedComments((prev) => ({
//       ...prev,
//       [commentId]: !prev[commentId],
//     }));
//   };

//   const renderComment = (comment, allComments, depth = 0) => {
//     //Extract responses to this comment
//     const replies = allComments.filter(
//       (c) => c.parent_comment_id === comment.id
//     );
//     const showReplies = expandedComments[comment.id];

//     return (
//       <CommentContainer key={comment.id} $hasLine={depth === 0}>
//         <CommentContent
//           onClick={() => replies.length > 0 && toggleReplies(comment.id)}
//         >
//           <AuthorRow>
//             <UserAvatar
//               username={comment.users?.username}
//               profilePictureUrl={comment.users?.profile_picture_url}
//             />
//             <div>
//               <UserName>{comment.users?.username}</UserName>
//               <PostDate>
//                 {" "}
//                 • {new Date(comment.created_at).toLocaleString()}
//               </PostDate>
//             </div>
//           </AuthorRow>
//           <CommentText>{comment.content}</CommentText>
//           <CommentActions>
//             <ActionButton>
//               <ThumbsUp size={16} /> Like
//             </ActionButton>
//             {replies.length > 0 && (
//               <ActionButton>
//                 <MessageCircle size={16} /> {replies.length}
//               </ActionButton>
//             )}
//           </CommentActions>
//         </CommentContent>
//         {showReplies &&
//           replies.map((reply) => renderComment(reply, allComments, depth + 1))}
//       </CommentContainer>
//     );
//   };

//   if (isLoading) return <Spinner />;
//   if (error || !post) return <p>Post not found</p>;
//   return (
//     <>
//       <ContentWrapper>
//         <Container>
//           <ArrowButton
//             style={{
//               position: "absolute",
//               top: "1rem",
//               left: "1rem",
//               zIndex: 10,
//             }}
//             onClick={() => navigate(from)}
//           >
//             <ArrowLeft />
//           </ArrowButton>
//           <PostHeader
//             username={post.users?.username || post.username}
//             avatarUrl={post.users?.profile_picture_url}
//             createdAt={post.created_at}
//             postId={post.id}
//           />

//           <PostContent
//             content={post.content}
//             mediaUrls={post.media_urls}
//             postId={post.id}
//           />
//           <PostActions postId={post.id} />

//           <div style={{ marginTop: "2rem" }}>
//             {loadingComments ? (
//               <p>Loading comments...</p>
//             ) : (
//               comments
//                 .filter((c) => c.parent_comment_id === null)
//                 .map((c) => renderComment(c, comments))
//             )}
//           </div>
//         </Container>
//       </ContentWrapper>
//     </>
//   );
// };

// export default PostDetails;
/*
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../services/postService";
import { getComments } from "../services/commentService";
import PostHeader from "../components/Post/PostHeader";
import PostContent from "../components/Post/PostContent";
import PostActions from "../components/Post/PostActions";
import Spinner from "../Shared/Spinner";
import { ArrowLeft, ThumbsUp, MessageCircle } from "lucide-react";
import { useState } from "react";
import UserAvatar from "../components/Post/UserAvatar";

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const ContentWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const ArrowButtonWrapper = styled.div`
  position: relative;
`;

const StyledArrowButton = styled.button`
  position: absolute;
  top: -40px;
  left: -10px;
  background: white;
  border: none;
  border-radius: 50%;
  padding: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 10;
`;

const CommentContainer = styled.div`
  border-left: ${({ $hasLine }) => ($hasLine ? "2px solid #28a745" : "none")};
  padding-left: 0.75rem;
  margin-bottom: 1rem;
`;

const CommentContent = styled.div`
  cursor: pointer;
`;

const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UserName = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.textColor};
`;

const PostDate = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.borderColor};
`;

const CommentText = styled.div`
  margin: 0.3rem 0;
`;

const CommentActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 0.5rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: ${({ theme }) => theme.textColor};
  font-size: 0.85rem;
`;

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expandedComments, setExpandedComments] = useState({});

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
    enabled: !!id,
  });

  const { data: comments = [], isLoading: loadingComments } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getComments(id),
  });

  const toggleReplies = (commentId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleBack = () => {
    navigate("/");
  };

  const renderComment = (comment, allComments, depth = 0) => {
    const replies = allComments.filter(
      (c) => c.parent_comment_id === comment.id
    );
    const showReplies = expandedComments[comment.id];

    return (
      <CommentContainer key={comment.id} $hasLine={depth === 0}>
        <CommentContent
          onClick={() => replies.length > 0 && toggleReplies(comment.id)}
        >
          <AuthorRow>
            <UserAvatar
              username={comment.users?.username}
              profilePictureUrl={comment.users?.profile_picture_url}
            />
            <div>
              <UserName>{comment.users?.username}</UserName>
              <PostDate>
                {" "}
                • {new Date(comment.created_at).toLocaleString()}
              </PostDate>
            </div>
          </AuthorRow>
          <CommentText>{comment.content}</CommentText>
          <CommentActions>
            <ActionButton>
              <ThumbsUp size={16} /> Like
            </ActionButton>
            {replies.length > 0 && (
              <ActionButton>
                <MessageCircle size={16} /> {replies.length}
              </ActionButton>
            )}
          </CommentActions>
        </CommentContent>
        {showReplies &&
          replies.map((reply) => renderComment(reply, allComments, depth + 1))}
      </CommentContainer>
    );
  };

  if (isLoading) return <Spinner />;
  if (error || !post) return <p>Post not found</p>;

  return (
    <ContentWrapper>
      <Container>
        <ArrowButtonWrapper>
          <StyledArrowButton onClick={handleBack}>
            <ArrowLeft />
          </StyledArrowButton>

          <PostHeader
            username={post.users?.username || post.username}
            avatarUrl={post.users?.profile_picture_url}
            createdAt={post.created_at}
            postId={post.id}
          />
        </ArrowButtonWrapper>

        <PostContent
          content={post.content}
          mediaUrls={post.media_urls}
          postId={post.id}
        />

        <PostActions postId={post.id} />

        <div style={{ marginTop: "2rem" }}>
          {loadingComments ? (
            <p>Loading comments...</p>
          ) : (
            comments
              .filter((c) => c.parent_comment_id === null)
              .map((c) => renderComment(c, comments))
          )}
        </div>
      </Container>
    </ContentWrapper>
  );
};

export default PostDetails;
*/
//كود معدل
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../services/postService";
import { getComments } from "../services/commentService";
import PostHeader from "../components/Post/PostHeader";
import PostContent from "../components/Post/PostContent";
import PostActions from "../components/Post/PostActions";
import Spinner from "../Shared/Spinner";
import { ArrowLeft, ThumbsUp, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import UserAvatar from "../components/Post/UserAvatar";
import { timeAgo } from "../utils/helpers";

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const ContentWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const ArrowButtonWrapper = styled.div`
  position: relative;
`;

const StyledArrowButton = styled.button`
  position: absolute;
  top: -40px;
  left: -10px;
  background: white;
  border: none;
  border-radius: 50%;
  padding: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 10;
`;

const CommentContainer = styled.div`
  border-left: ${({ $hasLine }) => ($hasLine ? "2px solid #28a745" : "none")};
  padding-left: 0.75rem;
  margin-bottom: 1rem;
`;

const CommentContent = styled.div`
  cursor: pointer;
`;

const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UserName = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.textColor};
`;

const PostDate = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.borderColor};
`;

const CommentText = styled.div`
  margin: 0.3rem 0;
`;

const CommentActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 0.5rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: ${({ theme }) => theme.textColor};
  font-size: 0.85rem;
`;

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expandedComments, setExpandedComments] = useState({});

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
    enabled: !!id,
  });

  const { data: comments = [], isLoading: loadingComments } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getComments(id),
  });

  // Restore scroll position after navigating back
  useEffect(() => {
    const scrollY = sessionStorage.getItem("scrollY");
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY));
      sessionStorage.removeItem("scrollY");
    }
  }, []);

  const toggleReplies = (commentId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleBack = () => {
    const returnTo = sessionStorage.getItem("returnToPost") || "/";
    navigate(returnTo);
    const scrollY = sessionStorage.getItem("scrollY");
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY));
      sessionStorage.removeItem("scrollY");
    }
  };

  const renderComment = (comment, allComments, depth = 0) => {
    const replies = allComments.filter(
      (c) => c.parent_comment_id === comment.id
    );
    const showReplies = expandedComments[comment.id];

    return (
      <CommentContainer key={comment.id} $hasLine={depth === 0}>
        <CommentContent
          onClick={() => replies.length > 0 && toggleReplies(comment.id)}
        >
          <AuthorRow>
            <UserAvatar
              username={comment.users?.username}
              profilePictureUrl={comment.users?.profile_picture_url}
            />
            <div>
              <UserName>{comment.users?.username}</UserName>
              <PostDate>
                {" "}
                • {new Date(comment.created_at).toLocaleString()}
              </PostDate>
            </div>
          </AuthorRow>
          <CommentText>{comment.content}</CommentText>
          <CommentActions>
            <ActionButton>
              <ThumbsUp size={16} /> Like
            </ActionButton>
            {replies.length > 0 && (
              <ActionButton>
                <MessageCircle size={16} /> {replies.length}
              </ActionButton>
            )}
          </CommentActions>
        </CommentContent>
        {showReplies &&
          replies.map((reply) => renderComment(reply, allComments, depth + 1))}
      </CommentContainer>
    );
  };

  if (isLoading) return <Spinner />;
  if (error || !post) return <p>Post not found</p>;

  return (
    <ContentWrapper>
      <Container>
        <ArrowButtonWrapper>
          <StyledArrowButton onClick={handleBack}>
            <ArrowLeft />
          </StyledArrowButton>

          <PostHeader
            username={post.users?.username || post.username}
            avatarUrl={post.users?.profile_picture_url}
            createdAt={timeAgo(post.created_at)}
            postId={post.id}
          />
        </ArrowButtonWrapper>

        <PostContent
          content={post.content}
          mediaUrls={post.media_urls}
          postId={post.id}
        />

        <PostActions postId={post.id} />

        <div style={{ marginTop: "2rem" }}>
          {loadingComments ? (
            <p>Loading comments...</p>
          ) : (
            comments
              .filter((c) => c.parent_comment_id === null)
              .map((c) => renderComment(c, comments))
          )}
        </div>
      </Container>
    </ContentWrapper>
  );
};

export default PostDetails;
