import "./Login.css";
import cart from "../../assets/icons/cart.svg";

const Login = () => {
  return (
    <div>
      <form className="form-signin">
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
          />
        </div>
        <a className="btn btn-primary" href="/products" role="button">
          Login
        </a>
      </form>
    </div>
  );
};

export default Login;
