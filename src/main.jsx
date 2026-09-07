// import { createRoot } from "react-dom/client";
// import "./styles/global.css";
// import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

// import App from "./App.jsx";
// import Characters from "./components/Characters.jsx";
// import Layout from "./Layout/Layout.jsx";
// import { CharacterProvider } from "./context/CharacterContext.jsx";
// import Help from "./components/Help.jsx";
// import Register from "./auth/Register.jsx";
// import Login from "./auth/Login.jsx";
// import { AuthProvider } from "./context/AuthContext.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <AuthProvider>
//         <CharacterProvider>
//           <Layout />
//         </CharacterProvider>
//       </AuthProvider>
//     ),
//     children: [
//       { index: true, element: <Navigate to="/jinwoo" replace /> },
//       { path: "characters", element: <Characters /> },
//       { path: ":characterId", element: <App /> },
//       { path: "/help", element: <Help /> },
//       { path: "/register", element: <Register /> },
//       { path: "/login", element: <Login /> },
//     ],
//   },
// ]);

// createRoot(document.getElementById("root")).render(
//   <RouterProvider router={router} />
// );
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Characters from "./components/Characters.jsx";
import Layout from "./Layout/Layout.jsx";
import Help from "./components/Help.jsx";
import Register from "./auth/Register.jsx";
import Login from "./auth/Login.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { CharacterProvider } from "./context/CharacterContext.jsx";
import Prova from "./components/Prova.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <CharacterProvider>
        <Layout />
      </CharacterProvider>
    ),
    children: [
      { index: true, element: <Navigate to="/jinwoo" replace /> },
      { path: "characters", element: <Characters /> },
      { path: "help", element: <Help /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: ":characterId", element: <App /> },
      { path: "prova", element: <Prova /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);