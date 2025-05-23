// import styled from "styled-components";
// import UserAvatar from "./UserAvatar";
// import { useEffect, useRef, useState } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { deletePost } from "../../services/postService";
// import { useLocation, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const HeaderWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   margin-bottom: 0.75rem;
// `;

// const UserInfo = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const UserNameDate = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const UserName = styled.span`
//   font-weight: bold;
//   color: ${({ theme }) => theme.textColor};
// `;

// const PostDate = styled.span`
//   font-size: 0.85rem;
//   color: ${({ theme }) => theme.borderColor};
// `;

// const OptionsButton = styled.button`
//   background: none;
//   border: none;
//   font-size: 1.25rem;
//   color: ${({ theme }) => theme.textColor};
//   cursor: pointer;
// `;

// const DropdownMenu = styled.div`
//   position: absolute;
//   top: 100%;
//   right: 0;
//   min-width: 140px;
//   background-color: ${({ theme }) => theme.bgColor};
//   border: 1px solid ${({ theme }) => theme.borderColor};
//   border-radius: 5px;
//   box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
//   z-index: 10;
// `;

// const MenuItem = styled.button`
//   background: none;
//   border: none;
//   padding: 0.6rem 1rem;
//   width: 100%;
//   text-align: left;
//   color: ${({ theme }) => theme.textColor};
//   font-size: 0.95rem;
//   white-space: nowrap;
//   cursor: pointer;

//   &:hover {
//     background-color: ${({ theme }) => theme.borderColor};
//   }
// `;

// const PostHeader = ({ username, createdAt, avatarUrl, postId }) => {
//   const [showMenu, setShowMenu] = useState(false);
//   const menuRef = useRef();

//   function toggleMenu() {
//     setShowMenu((menu) => !menu);
//   }

//   const handleClickOutside = (event) => {
//     if (menuRef.current && !menuRef.current.contains(event.target)) {
//       setShowMenu(false);
//     }
//   };

//   useEffect(() => {
//     if (showMenu) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showMenu]);

//   const navigate = useNavigate();
//   const { pathname } = useLocation();

//   const queryClient = useQueryClient();
//   const { isLoading: isDeleting, mutate } = useMutation({
//     mutationFn: deletePost,
//     onSuccess: () => {
//       toast.success("Post successfully deleted");
//       if (pathname === `/post/${postId}`) navigate(-1);
//       queryClient.invalidateQueries({
//         queryKey: ["Posts"],
//       });
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   return (
//     <HeaderWrapper>
//       <UserInfo>
//         <UserAvatar username={username} profilePictureUrl={avatarUrl} />
//         <UserNameDate>
//           <UserName>{username}</UserName>
//           <PostDate>{createdAt}</PostDate>
//         </UserNameDate>
//       </UserInfo>
//       <div style={{ position: "relative" }} ref={menuRef}>
//         <OptionsButton onClick={toggleMenu}>⋮</OptionsButton>
//         {showMenu && (
//           <DropdownMenu>
//             <MenuItem onClick={() => mutate(postId)} disabled={isDeleting}>
//               Delete Post
//             </MenuItem>
//           </DropdownMenu>
//         )}
//       </div>
//     </HeaderWrapper>
//   );
// };

// export default PostHeader;

import styled from "styled-components";
import UserAvatar from "./UserAvatar";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../../services/postService";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem; /* قللنا المسافة بين الصورة والاسم */
`;

const UserNameDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem; /* المسافة بين الاسم والتاريخ */
  white-space: nowrap;
`;

const UserName = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.textColor};
  font-size: 1rem;
`;

const PostDate = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textColor}99;
`;

const OptionsButton = styled.button`
  background: none;
  border: none;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 140px;
  background-color: ${({ theme }) => theme.bgColor};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  z-index: 10;
`;

const MenuItem = styled.button`
  background: none;
  border: none;
  padding: 0.6rem 1rem;
  width: 100%;
  text-align: left;
  color: ${({ theme }) => theme.textColor};
  font-size: 0.95rem;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.borderColor};
  }
`;

const PostHeader = ({ username, createdAt, avatarUrl, postId }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  function toggleMenu() {
    setShowMenu((menu) => !menu);
  }

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success("Post successfully deleted");
      if (pathname === `/post/${postId}`) navigate(-1);
      queryClient.invalidateQueries({
        queryKey: ["Posts"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <HeaderWrapper>
      <UserInfo>
        <UserAvatar username={username} profilePictureUrl={avatarUrl} />
        <UserNameDate>
          <UserName>{username}</UserName>
          <PostDate>{createdAt}</PostDate>
        </UserNameDate>
      </UserInfo>
      <div style={{ position: "relative" }} ref={menuRef}>
        <OptionsButton onClick={toggleMenu}>⋮</OptionsButton>
        {showMenu && (
          <DropdownMenu>
            <MenuItem onClick={() => mutate(postId)} disabled={isDeleting}>
              Delete Post
            </MenuItem>
          </DropdownMenu>
        )}
      </div>
    </HeaderWrapper>
  );
};

export default PostHeader;
