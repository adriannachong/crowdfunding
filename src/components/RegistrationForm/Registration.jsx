import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./RegistrationForm.css";

function RegistrationForm() {
  const authToken = window.localStorage.getItem("token");
  const [users, setUsers] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setUsers((prevUsers) => ({ ...prevUsers, [id]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!authToken) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}users/`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(users),
        });
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    } else {
      navigate("/");
    }
  };

  return (
    <div className="registration-form-wrapper">
      <h2>Join the medical research community</h2>
      <p>
        Register now to create your own project or to pledge to an existing
        project.
      </p>
      <form onSubmit={handleSubmit}>
        <h2>Register </h2>
        <div className="form-item">
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            required="required"
          />
          <label htmlFor="username">
            <span>Username</span>
          </label>
        </div>
        <div className="form-item">
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            required="required"
          />
          <label htmlFor="email">
            <span>Email</span>
          </label>
        </div>
        <div className="form-item">
          <input
            type="text"
            id="password"
            name="password"
            required="required"
            onChange={handleChange}
          />
          <label htmlFor="password">
            <span>Password</span>
          </label>
        </div>
        <button type="submit">Register</button>
        <p>
          Already have an account? Login <Link to="/login">here</Link>.
        </p>
      </form>
    </div>
  );
}

export default RegistrationForm;