import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/icons/cart2.png";
import person from "../assets/icons/person.png";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Navbar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/categories/all`)
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <nav
      className="navbar navbar-expand-md bg-dark sticky-top border-bottom"
      data-bs-theme="dark"
    >
      {" "}
      <div className="container">
        {" "}
        <a className="navbar-brand d-md-none" href="#">
          {" "}
          Aperture
        </a>{" "}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvas"
          aria-controls="offcanvas"
          aria-label="Toggle navigation"
        >
          {" "}
          <span className="navbar-toggler-icon"></span>{" "}
        </button>{" "}
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvas"
          aria-labelledby="offcanvasLabel"
        >
          {" "}
          <div className="offcanvas-header">
            {" "}
            <h5 className="offcanvas-title" id="offcanvasLabel">
              Aperture
            </h5>{" "}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>{" "}
          </div>{" "}
          <div className="offcanvas-body">
            {" "}
            <ul className="navbar-nav flex-grow-1 justify-content-between">
              {" "}
              <li className="nav-item">
                <a className="nav-link" href="#" aria-label="Aperture">
                  {" "}
                  <svg className="bi" width="24" height="24" aria-hidden="true">
                    <use xlinkHref="#aperture"></use>
                  </svg>{" "}
                </a>
              </li>{" "}
              <li className="nav-item">
                <a className="nav-link" href="/products">
                  Products
                </a>
              </li>{" "}
              <li className="nav-item">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNavDarkDropdown"
                  aria-controls="navbarNavDarkDropdown"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarNavDarkDropdown"
                >
                  <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDarkDropdownMenuLink"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Categories
                      </a>
                      <ul
                        className="dropdown-menu dropdown-menu-dark"
                        aria-labelledby="navbarDarkDropdownMenuLink"
                      >
                        {categories.map((category) => (
                          <li key={category.id}>
                            <Link
                              className="dropdown-item"
                              to={`/category/${category.name}`}
                            >
                              {category.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </div>
              </li>{" "}
              <li className="nav-item">
                <a className="nav-link" href="/orders">
                  Orders
                </a>
              </li>{" "}
              <li className="nav-item">
                <a className="nav-link" href="/cart">
                  <img
                    src={logo}
                    alt={logo}
                    width="25"
                    height="25"
                    style={{ marginRight: "10px" }}
                  />
                  Cart
                </a>
              </li>{" "}
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/user"
                  aria-label="Cart"
                >
                  <img src={person} alt={person} width="25" height="25" />
                </a>
              </li>{" "}
            </ul>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </nav>
  );
};

export default Navbar;
