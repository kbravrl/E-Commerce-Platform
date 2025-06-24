import React from "react";
import './Login.css';
import logo from '../../assets/cart.svg';

const Login = () => {
  return (
    <div>
      <form class="form-signin">
        <div class="text-center mb-4">
          <img
            class="mb-4"
            src={logo}
            alt={logo}
            width="72"
            height="72"
          />

          <h1 class="h3 mb-3 font-weight-normal">Floating labels</h1>
          <p>
            Build form controls with floating labels via the{" "}
            
          </p>
        </div>

        <div class="form-label-group mb-2">
        <label for="inputEmail">Email address</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            required=""
            autofocus=""
          />
          
        </div>

        <div class="form-label-group mb-2">
        <label for="inputPassword">Password</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            required=""
          />
          
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
