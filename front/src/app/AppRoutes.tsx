import { createBrowserRouter } from "react-router-dom";
import { CatsPage } from "../pages/CatsPage/CatsPage";
import App from "./App";
import { FavoriteCatsPage } from "../pages/FavoriteCatsPage/FavoriteCatsPage";

export const appRoutesURL = {
  home: "/",
  liked: "/liked",
};


export const appRoutes = createBrowserRouter([
  {
    path: appRoutesURL.home,
    element: <App />,
    children: [
      { index: true, element: <CatsPage /> },
      {
        path: appRoutesURL.liked,
        element: <FavoriteCatsPage />,
      },
    ],
  },
]);
