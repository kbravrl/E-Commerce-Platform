import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "../../components/InputField";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Register = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       await axios.post(`${baseUrl}/auth/register`, {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      navigate("/");
      alert("Registration successful! to validate your account, please check your email.");
    } catch (error) {
      if (error.response?.status === 409) {
        alert("This email is already registered. Please try another one.");
      } else {
        console.error(error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h5 className="mb-4 text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-3xl">
        Create an account
      </h5>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <InputField
          id="firstName"
          ref={firstNameRef}
          label="FirstName"
          type="text"
        />
        <InputField
          id="lastName"
          ref={lastNameRef}
          label="LastName"
          type="text"
        />
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
          Create an account
        </button>
        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-semibold text-gray-800 hover:text-gray-900"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
