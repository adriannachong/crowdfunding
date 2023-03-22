import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";

// Pages
import HomePage from "./pages/HomePage/HomePage";
import ProjectPage from "./pages/ProjectPage/ProjectPage";
import LoginPage from "./pages/LoginPage";
import EditProjectPage from "./pages/EditProjectPage/EditProjectPage";
import CreateProject from "./pages/CreateProject/CreateProject";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import AllProjects from "./pages/AllProjects/AllProjects";

// Components
import Nav from "./components/Nav/nav";

// CSS
import "./App.css";

const Layout = () => {
  const [loggedIn, setLoggedIn] = useState(
    window.localStorage.getItem("token") != null
  );
  const [user, setUser] = useState();

  useEffect(() => {
    const authToken = window.localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_API_URL}users/me`, {
      method: "get",
      headers: {
        Authorization: `Token ${authToken}`,
      },
    })
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setUser(data);
      });
  }, [loggedIn]);

  return (
    <div>
      <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Outlet context={{ loggedIn, setLoggedIn, user }} />
    </div>
  );
};


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/project/:id", element: <ProjectPage /> },
      { path: "/projects", element: <AllProjects /> },
      { path: "/create-project", element: <CreateProject /> },
      { path: "/project/:id/edit", element: <EditProjectPage /> },
      { path: "/register", element: <RegistrationPage /> },

      {},
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;