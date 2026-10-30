import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layout/mainlayout";
import Home from "../pages/home";
import LoginPage from "../pages/loginPage";
import SignupPage from "../pages/signupPage";
import Addpostpage from "../pages/addpostpage";
import Allpostpage from "../pages/allpostpage";
import Post from "../pages/post";
import EditPost from "../pages/editPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "all-posts",
        element: <Allpostpage />,
      },
      {
        path: "auth",
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "signup",
            element: <SignupPage />,
          },
        ],
      },
      {
        path: "create",
        children: [
          {
            path: "add-post",
            element: <Addpostpage />,
          },
        ],
      },
      {
        path: "post/:slug",
        element: <Post />,
      },
      {
        path: "edit/:slug",
        element: <EditPost />,
      },
    ],
  },
]);

export default router;
