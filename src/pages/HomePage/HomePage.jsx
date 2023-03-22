import { useState, useEffect } from "react";

//Components
import ProjectCard from "../../components/ProjectCard/ProjectCard";

//Media
// // import banner from "../media/drugs-banner.jpeg";
// import logo from "../../media/logo.png";
// import banner from "../../media/stethoscope.jpeg";

//CSS
import "./HomePage.css";

function HomePage() {
  //State
  const [projectList, setProjectList] = useState([]);
  const [shuffledProjectList, setShuffledProjectList] = useState([]);

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

  useEffect(() => {
    shuffleProjectList();
  }, [projectList]);

  const shuffleProjectList = () => {
    const shuffledList = [...projectList]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    setShuffledProjectList(shuffledList);
  };
  return (
    <div className="homepage-wrapper">
      <section className="homepage-hero">
        <img src={banner} className="homepage-image"></img>
        {/* <div
          className="homepage-image"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <div className="homepage-image-overlay"></div>
        </div> */}
        <div className="header">
          <div className="heading">
            <img src={logo} alt="" className="homepage-logo" />
            <h1>MedLab</h1>
          </div>
          <h3>crowdfund your research</h3>
        </div>
        <a href="/create-project" className="project-registration">
          Register your project →
        </a>
      </section>
      <h2>Recent Projects</h2>
      <div id="project-list">
        {projectList.slice(0, 3).map((project, key) => {
          return <ProjectCard key={key} projectData={project} />;
        })}
      </div>
      <button onClick={shuffleProjectList}>Shuffle Projects</button>
      <div id="project-list">
        {shuffledProjectList.map((project, key) => {
          return <ProjectCard key={key} projectData={project} />;
        })}
      </div>
    </div>
  );
}

export default HomePage;