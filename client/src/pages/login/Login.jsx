import "./Login.css";
import logo from "../../assets/icons/cart.svg";

const Login = () => {
  return (
    <div>
      <form class="form-signin">
        <div class="text-center mb-4">
          <img class="mb-4" src={logo} alt={logo} width="72" height="72" />

          <h1 class="h3 mb-3 font-weight-normal">Hoşgeldiniz</h1>
          <p>Alışveriş bir tık öte — stil seninle başlar.</p>
        </div>

        <div class="form-label-group mb-2">
          <label for="inputEmail">Email Adresi</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email adresi"
            required=""
            autofocus=""
          />
        </div>

        <div class="form-label-group mb-2">
          <label for="inputPassword">Şifre</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Şifre"
            required=""
          />
        </div>
        <a
          class="btn btn-primary"
          href="http://localhost:5173/products"
          role="button"
        >
          Giriş Yap
        </a>
      </form>
    </div>
  );
};

export default Login;
