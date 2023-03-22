import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Link to="/">Home</Link>
    </nav>
  );
}

export default Nav;
import { Link, useNavigate } from "react-router-dom";
import logo from "../../media/logo.png";
import "./Nav.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faX } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";

function Nav(props) {
  const [navbar, setNavbar] = useState(false);
  const navRef = useRef();
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = props;

  const handleClick = () => {
    window.localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/");
    navRef.current.classList.toggle("responsive_nav");
  };

  const showNavBar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const changeNavbar = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeNavbar);

  const xIcon = <FontAwesomeIcon icon={faX} />;

  return (
    <div className={navbar ? "nav-bar-wrapper active" : "nav-bar-wrapper"}>
      <a href="/">
        <img src={logo} className="nav-logo" />
      </a>
      <nav ref={navRef}>
        <Link to="/" onClick={showNavBar}>
          Home
        </Link>
        <Link to="/projects" onClick={showNavBar}>
          Projects
        </Link>
        {!loggedIn && (
          <Link to="/login" onClick={showNavBar}>
            Login
          </Link>
        )}
        {!loggedIn && (
          <Link to="/register" onClick={showNavBar}>
            Register
          </Link>
        )}
        {loggedIn && (
          <Link to="/bookmarks" onClick={showNavBar}>
            Bookmarks
          </Link>
        )}
        {loggedIn && <a onClick={handleClick}>Sign out</a>}
        <button onClick={showNavBar} className="nav-btn nav-close-btn">
          {xIcon}
        </button>
      </nav>
      <button onClick={showNavBar} className="nav-btn">
        {" "}
        <FaBars />
      </button>
    </div>
  );
}

export default Nav;