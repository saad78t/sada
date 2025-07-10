app tree

```
sada-app/
│
├── src/
│   ├── assets/
│
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── SignupForm.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── AuthWrapper.jsx
│   │
│   │   ├── Comment/
│   │   │   ├── CommentActions.jsx
│   │   │   ├── CommentHeader.jsx
│   │   │   ├── CommentItem.jsx
│   │   │   ├── CommentOptionsMenu.jsx
│   │   │   ├── CommentThread.jsx
│   │   │   ├── ReplyForm.jsx
│   │   │   └── TreeLineSVG.jsx
│   │
│   │   ├── PhotoModalPages/
│   │   │   ├── PhotoModalCloseButton.jsx
│   │   │   ├── PhotoModalCommentsList.jsx
│   │   │   ├── PhotoModalImageSection.jsx
│   │   │   ├── PhotoModalInfoSection.jsx
│   │   │   ├── PhotoModalMediaViewer.jsx
│   │   │   ├── PhotoModalNavButtons.jsx
│   │   │   ├── PhotoModalOverlay.jsx
│   │   │   ├── PhotoModalPostActions.jsx
│   │   │   ├── PhotoModalPostContent.jsx
│   │   │   ├── PhotoModalPostHeader.jsx
│   │   │   └── PhotoModalReplyForm.jsx
│   │
│   │   ├── Post/
│   │   │   ├── PostActions.jsx
│   │   │   ├── PostContent.jsx
│   │   │   ├── PostHeader.jsx
│   │   │   ├── PostItem.jsx
│   │   │   ├── UserAvatar.jsx
│   │   │   └── VideoJsPlayer.jsx
│   │
│   │   ├── PostDetailsPages/
│   │   │   ├── PostDetailsActions.jsx
│   │   │   ├── PostDetailsComments.jsx
│   │   │   ├── PostDetailsCommentItem.jsx
│   │   │   ├── PostDetailsCommentsList.jsx
│   │   │   ├── PostDetailsContent.jsx
│   │   │   ├── PostDetailsHeader.jsx
│   │   │   └── PostDetailsMeta.jsx
│   │
│   │   ├── Shared/
│   │   │   ├── Button.jsx
│   │   │   ├── FloatingAddButton.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── ReadMoreButton.jsx
│   │   │   └── Spinner.jsx
│   │
│   │   ├── layout/
│   │   │   ├── BottomNav.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Layout.jsx
│
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useComments.js
│   │   └── usePostStats.js
│
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── NewPost.jsx
│   │   ├── PhotoModal.jsx
│   │   ├── PostDetails.jsx
│   │   ├── Profile.jsx
│   │   ├── Signup.jsx
│   │   └── PostDetails.jsx
│
│   ├── routes/
│   │   └── AppRoutes.jsx
│
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── commentService.js
│   │   ├── likeService.js
│   │   ├── notificationService.js
│   │   ├── postService.js
│   │   ├── supabaseClient.js
│   │   └── userService.js
│
│   ├── styles/
│   │   ├── GlobalStyle.js
│   │   └── theme.js.js
│
│   ├── utils/
│   │   └── helpers.js
│
│   ├── App.jsx
│   └── main.jsx
│
└── .env

```
