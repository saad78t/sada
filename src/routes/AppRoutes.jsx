import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NewPost from "../pages/NewPost";
import PostDetails from "../pages/PostDetails";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Layout from "../layout/Layout";
import CommentDetails from "../Comment/CommentDetails";
import PhotoModal from "../pages/PhotoModal";

function AppRoutes({ toggleTheme, isDarkMode }) {
  return (
    <Routes>
      <Route
        element={<Layout toggleTheme={toggleTheme} isDarkMode={isDarkMode} />}
      >
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<NewPost />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/comment/:id" element={<CommentDetails />} />
        <Route path="/post/:id/photo/:photoIndex" element={<PhotoModal />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default AppRoutes;
