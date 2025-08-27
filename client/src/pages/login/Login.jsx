import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LogoHeader from "../../components/LogoHeader";
import InputField from "../../components/InputField";


const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/v1/auth/login`, {
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
          id="email"
          ref={emailRef}
          label="Email Address"
          type="email"
        />
        <InputField
          id="password"
          ref={passwordRef}
          label="Password"
          type="password"
        />
        <button
          type="submit"
          className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg mt-2"
        >
          Login
        </button>
        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?{" "}
          <Link
            to="/register"
            className="font-semibold text-gray-800 hover:text-gray-900"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
