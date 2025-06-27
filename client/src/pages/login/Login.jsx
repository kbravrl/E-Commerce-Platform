import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import cart from "../../assets/icons/cart.svg";
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
        <div className="text-center mb-4">
          <img className="mb-4" src={cart} alt={cart} width="72" height="72" />

          <h1 className="h3 mb-3 font-weight-normal">Welcome</h1>
          <p>
            Your next favorite find is just a click away — shop smart, live
            stylish.
          </p>
        </div>

        <div className="form-label-group mb-2">
          <label htmlFor="inputEmail">Email Address</label>
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email adresi"
            required=""
            autoFocus=""
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-label-group mb-2">
          <label htmlFor="inputPassword">Password</label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Şifre"
            required=""
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-3">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
