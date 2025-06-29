import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LogoHeader from "../../components/LogoHeader"; 
import InputField from "../../components/InputField";
import "./Login.css";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("All fields are required!");
    }

    try {
      axios
        .post(`${baseUrl}/auth/login`, {
          email,
          password,
        })
        .then((response) => {
          const token = response.data.data.token;
          localStorage.setItem("token", token);
        });

      navigate("/products");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Incorrect email or password.");
      }
    }
  };

  return (
    <div>
      <form className="form-signin" onSubmit={handleSubmit}>
        <LogoHeader />
        <InputField id={"inputEmail"} label={"Email Address"} type={"email"} placeholder={"username"} onChange={(e) => setEmail(e.target.value)}/>
        <InputField id={"inputPassword"} label={"Password"} type={"password"} placeholder={"passport"} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit" className="btn btn-primary w-100 mt-3">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
