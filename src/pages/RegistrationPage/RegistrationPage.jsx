import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import { Link } from "react-router-dom";

function RegistrationPage(props) {
  const authToken = window.localStorage.getItem("token");

  return (
    <div>
      {!authToken ? (
        <>
          <RegistrationForm />
        </>
      ) : (
        <>
          <h2>You are already logged in!</h2>
          <Link to="/">Back to Home Page</Link>
        </>
      )}
    </div>
  );
}

export default RegistrationPage;