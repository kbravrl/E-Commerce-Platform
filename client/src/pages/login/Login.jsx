import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LogoHeader from "../../components/LogoHeader";
import InputField from "../../components/InputField";
import "./Login.css";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        email : emailRef.current.value,
        password : passwordRef.current.value,
      });

      const token = response.data.data.token;
      localStorage.setItem("token", token);
      navigate("/products");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Incorrect email or password.");
      } else {
        alert(
          "An unexpected error occurred: " +
            (error.response?.data?.message || error.message)
        );
      }
    }
  };

  return (
    <div>
      <form className="form-signin" onSubmit={handleSubmit}>
        <LogoHeader />
        <InputField
          id={"inputEmail"}
          ref={emailRef}
          label={"Email Address"}
          type={"email"}
        />
        <InputField
          id={"inputPassword"}
          ref={passwordRef}
          label={"Password"}
          type={"password"}
        />
        <button type="submit" className="btn btn-primary w-100 mt-3">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
