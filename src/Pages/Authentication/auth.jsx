import SignIn from "../../Components/Signin/signin";
import SignUp from "../../Components/Signup/signup";
import "./auth.css";

const Login = () => {
  return (
    <div className="auth-container">
      <div className="sign-in">
        <SignIn />
      </div>
      <div className="sign-up">
        <SignUp />
      </div>
    </div>
  );
};
export default Login;
