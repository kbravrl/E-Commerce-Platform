import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LogoHeader from "../../components/LogoHeader";
import InputField from "../../components/InputField";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      const token = response.data.data.token;
      localStorage.setItem("token", token);
      navigate("/products");
    } catch (error) {
      if (error.response?.status === 401) {
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
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <LogoHeader />
        <InputField
          id="inputEmail"
          ref={emailRef}
          label="Email Address"
          type="email"
        />
        <InputField
          id="inputPassword"
          ref={passwordRef}
          label="Password"
          type="password"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-2"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
