import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import Ragester from "./pages/ragester";
import Admin from "./pages/admin";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/ragester",
    element: <Ragester />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);

const App = () => {
  return <RouterProvider router={Router} />;
};

export default App;
