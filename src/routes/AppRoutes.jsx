import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NewPost from "../pages/NewPost";
import PostDetails from "../pages/PostDetails";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Layout from "../layout/Layout";
import CommentDetails from "../Comment/CommentDetails";

function AppRoutes({ toggleTheme, isDarkMode }) {
  return (
    <Routes>
      {/* الصفحات العامة داخل الـ Layout */}
      <Route
        element={<Layout toggleTheme={toggleTheme} isDarkMode={isDarkMode} />}
      >
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<NewPost />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/comment/:id" element={<CommentDetails />} />
      </Route>

      {/* الصفحات الخاصة خارج الـ Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default AppRoutes;
