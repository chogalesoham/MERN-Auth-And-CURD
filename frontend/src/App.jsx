import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import Ragester from "./pages/ragester";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/ragester",
    element: <Ragester />,
  },
]);

const App = () => {
  return <RouterProvider router={Router} />;
};

export default App;
