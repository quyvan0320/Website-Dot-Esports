import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Account from "./pages/User/Account.jsx";
import Categories from "./pages/Category/Categories.jsx";
import Topic from "./pages/Topic/Topic.jsx";
import CreatePost from "./pages/Post/CreatePost.jsx";
import CategoryPost from "./pages/CategoryPost.jsx";
import PostPage from "./pages/PostPage.jsx";
import MyPost from "./pages/Post/MyPost.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        index: true,
        path: "",
        element: <Home />,
      },
      {
        path: "/:categorySlug",
        element: <CategoryPost />,
      },
      {
        path: "/:topicSlug/:postSlug",
        element: <PostPage />,
      },
      {
        path: "",
        element: <AdminRoute />,
        children: [
          {
            path: "category",
            element: <Categories />,
          },
          {
            path: "topic",
            element: <Topic />,
          },
        ],
      },
      {
        path: "",
        element: <PrivateRoute />,
        children: [
          {
            path: "account",
            element: <Account />,
          },
          {
            path: "my-post",
            element: <MyPost />,
          },
          {
            path: "create-post",
            element: <CreatePost />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
