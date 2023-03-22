import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

import "./LoginForm.css";

function LoginForm() {
  const { setLoggedIn } = useOutletContext();

  //State
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // Hooks
  const navigate = useNavigate();

  //Actions
  const handleChange = (event) => {
    const { id, value } = event.target;

    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const postData = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}api-token-auth/`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );
    return response.json();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (credentials.username && credentials.password) {
      const { token } = await postData();
      if (token !== undefined) {
        window.localStorage.setItem("token", token);
        setLoggedIn(true);
        navigate("/");
      } else setLoggedIn(false);

      //   fetch(`${import.meta.env.VITE_API_URL}api-token-auth/`, {
      //     method: "post",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(credentials),
      //   }).then((response) => {
      //     console.log(response.json());
      //   });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form-wrapper">
      <h2>Login</h2>
      <div className="form-item">
        <input
          type="text"
          id="username"
          name="username"
          required="required"
          onChange={handleChange}
        />
        <label htmlFor="username">
          <span>Username</span>
        </label>
      </div>
      <div className="form-item">
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          required="required"
        />
        <label htmlFor="password">
          <span>Password</span>
        </label>
      </div>
      <button type="submit">Login</button>
      <p>
        Don't have an account? Register <Link to="/register">here</Link>.
      </p>
    </form>
  );
}

export default LoginForm;