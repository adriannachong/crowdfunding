import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProjectPage.css";
import logo from "../../media/logo.png";
import moment from "moment";
import PledgeForm from "../../components/PledgeForm/PledgeForm";
import { useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPenToSquare,
  faTrash,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert";

function ProjectPage() {
  //State
  const [project, setProject] = useState({ pledges: [] });
  const [owner, setOwner] = useState([]);
  const [bookmark, setBookmark] = useState(false);

  //Context
  const { user } = useOutletContext();

  //Hooks
  const { id } = useParams();
  const navigate = useNavigate();

  //Effects
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}projects/${id}`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProject(data);
        data.bookmarked_by.map((bookmark_user) => {
          // console.log(bookmark_user, user);

          if (bookmark_user.id === user?.id) {
            setBookmark(true);
          }
        });
        const userId = data.owner;
        return fetch(`${import.meta.env.VITE_API_URL}users/${userId}`);
      })
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        return setOwner(data);
      });
  }, [user]);

  const addToBookmark = (event) => {
    const authToken = window.localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_API_URL}projects/${id}/bookmarked/`, {
      method: "post",
      headers: {
        Authorization: `Token ${authToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("something went wrong");
        }
        setBookmark(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteProject = (e) => {
    const authToken = window.localStorage.getItem("token");

    if (authToken) {
      fetch(`${import.meta.env.VITE_API_URL}projects/${id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("something went wrong");
          }
          navigate("/");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      navigate("/");
    }
  };

  const submitDelete = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure you want to delete this project?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteProject(),
        },
        {
          label: "No",
          //onClick: () => alert('Click No')
        },
      ],
    });
  };

  // Variables
  const currentDate = moment();
  const closingDate = moment(project.closing_date);

  const diff = closingDate.diff(currentDate, "days");

  const is_open = moment().isSameOrBefore(closingDate);

  const emailIcon = <FontAwesomeIcon icon={faEnvelope} />;
  const editIcon = <FontAwesomeIcon icon={faPenToSquare} />;
  const deleteIcon = <FontAwesomeIcon icon={faTrash} />;
  const bookmarkedIcon = <FontAwesomeIcon icon={faBookmark} />;

  return (
    <div>
      <div
        id="variable-background"
        className="background-image"
        style={{ backgroundImage: `url(${project.image})` }}
      >
        <div className="image-overlay"></div>
      </div>
      <img src={logo} className="logo"></img>
      <div className="project-wrapper">
        <section className="project-details">
          <h2>{project.title}</h2>
          <h6>{owner.username}</h6>
          <div className="owner-email">
            {emailIcon}
            <span>{owner.email}</span>
          </div>
          <div className="active-bookmark-wrapper">
            <span className="active">
              {is_open ? <span>Active</span> : <span>Inactive</span>}
            </span>

            {bookmark ? (
              <span className="bookmarked-icon">
                {bookmarkedIcon} Bookmarked
              </span>
            ) : (
              <span onClick={addToBookmark} className="bookmark-button">
                {bookmarkedIcon} Bookmark
              </span>
            )}
          </div>
          {/* <div>
            {" "}
            {bookmark === false ? (
              <button onClick={handleBookmark}>Bookmark</button>
            ) : (
              <button onClick={handleBookmark}>Bookmarked</button>
            )}
          </div> */}
        </section>
        <section>
          <div className="project-metrics">
            {/* <h3>Created on: {project.date_created}</h3> */}
            <p>
              ${project.total ? project.total : 0}{" "}
              <span>of ${project.goal} raised</span>
            </p>
            <p>
              {project.pledges.length} <span>total supporters</span>
            </p>
            {/* <h3>{`Status: ${project.is_open}`}</h3> */}

            <p>
              {diff > 0 ? diff : 0} <span>days left</span>
            </p>
          </div>
        </section>
        <section className="about-project">
          <h3>About this project</h3>
          <p>{project.description}</p>
        </section>
        <section className="pledges">
          <h3>Pledges</h3>
          <ul>
            {project.pledges.map((pledge, key) => {
              return (
                <li key={key}>
                  ${pledge.amount} from {pledge.supporter}
                  <div className="pledge-comment">{pledge.comment}</div>
                </li>
              );
            })}
          </ul>
        </section>

        <PledgeForm project={project} />
        <div className="edit-delete-wrapper">
          {user && user.id === project.owner && (
            <>
              <a href={`/project/${project.id}/edit`} className="edit-project">
                {editIcon}
              </a>
              <a className="delete-project" onClick={submitDelete}>
                {deleteIcon}
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;