import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import ReactDOM from "react-dom/client";
import "./index.css";
import store from "./store/store.ts";
import { appRoutes } from "./app/AppRoutes.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <RouterProvider router={appRoutes} />
    </Provider>
);
