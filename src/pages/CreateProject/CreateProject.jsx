import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import ProjectForm from "../../components/ProjectForm/ProjectForm";
import "./CreateProject.css";

function CreateProject(props) {
  const authToken = window.localStorage.getItem("token");
  const [project, setProject] = useState({
    title: "",
    description: "",
    goal: null,
    image: "",
    is_open: true,
    date_created: null,
    closing_date: null,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (id, value) => {
    setProject((prevProject) => ({
      ...prevProject,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const authToken = window.localStorage.getItem("token");

    if (authToken) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}projects/`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${authToken}`,
            },
            body: JSON.stringify(project),
          }
        );
        if (!response.ok) {
          throw new Error(await response.text());
        }
        // navigate(`/project/${project.id}`)
        navigate("/");
      } catch (err) {
        console.error(err);
        alert(`Error: ${err.message}`);
      }
    } else {
      navigate(`/login`);
    }
  };

  return (
    <div className="create-project-form-wrapper">
      <h2>Create a New Project</h2>
      {authToken ? (
        <ProjectForm
          onChange={handleChange}
          onSubmit={handleSubmit}
          project={project}
          label="Create Project"
        />
      ) : (
        <div className="create-project">
          <h3>Uh oh!</h3>
          <p>
            You'll have to <Link to="/login">log in</Link> or{" "}
            <Link to="/register">register</Link> to create a project.
          </p>
        </div>
      )}
    </div>
  );
}

export default CreateProject;