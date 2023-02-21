import { useState } from "react";

function LoginForm() {
  // State
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // Actions
  const handleChange = (event) => {
    const { id, value } = event.target;

    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (credentials.username && credentials.password) {
      fetch(`${import.meta.env.VITE_API_URL}api-token-auth/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }).then((response) => {
        console.log(response.json());
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          onChange={handleChange}
          placeholder="Enter username"
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={handleChange}
          placeholder="Password"
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;