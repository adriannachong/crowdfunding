import { useState, useEffect } from "react";

//Components
import ProjectCard from "../../components/ProjectCard/ProjectCard";

import "./AllProjects.css";

function AllProjects() {
  //State
  const [projectList, setProjectList] = useState([]);

  //Effects
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}projects`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProjectList(data);
      });
  }, []);

  return (
    <div className="all-projects-wrapper">
      <h2>All Projects</h2>
      <div id="project-list">
        {projectList.map((project, key) => {
          return <ProjectCard key={key} projectData={project} />;
        })}
      </div>
    </div>
  );
}

export default AllProjects;