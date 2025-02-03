import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Auth from "../layouts/Auth";
import NonAuth from "../layouts/NonAuth";
import Home from "../pages/Home";
import ClerkAuth from "../pages/ClerkAuth";
import History from "../pages/History";

const router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Auth />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "history",
            element: <History />,
          },
        ],
      },
      {
        path: "/auth",
        element: <NonAuth />,
        children: [
          {
            path: "",
            element: <ClerkAuth />,
          },
        ],
      },
    ],
  },
]);

export default router;
