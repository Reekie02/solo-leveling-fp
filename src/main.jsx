import { createRoot } from "react-dom/client";
import "./styles/global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CharacterRoute from "./components/CharacterRoute.jsx";
import RedirectToCurrent from "./components/RedirectToCurrent.jsx";
import Characters from "./components/Characters.jsx";
import Layout from "./Layout/Layout.jsx";
import Help from "./components/Help.jsx";
import Register from "./auth/Register.jsx";
import Login from "./auth/Login.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { CharacterProvider } from "./context/CharacterContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <CharacterProvider>
        <Layout />
      </CharacterProvider>
    ),
    children: [
      { index: true, element: <RedirectToCurrent /> },
      { path: "characters", element: <Characters /> },
      { path: "help", element: <Help /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: ":characterId", element: <CharacterRoute /> },
      { path: "*", element: <RedirectToCurrent /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);