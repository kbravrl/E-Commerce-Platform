import React from "react";
import logo from "../../assets/cart2.png";
import person from "../../assets/person.png"

const Product = () => {
  return (
    <div>
      <nav
        class="navbar navbar-expand-md bg-dark sticky-top border-bottom"
        data-bs-theme="dark"
      >
        {" "}
        <div class="container">
          {" "}
          <a class="navbar-brand d-md-none" href="#">
            {" "}
            Aperture
          </a>{" "}
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvas"
            aria-controls="offcanvas"
            aria-label="Toggle navigation"
          >
            {" "}
            <span class="navbar-toggler-icon"></span>{" "}
          </button>{" "}
          <div
            class="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvas"
            aria-labelledby="offcanvasLabel"
          >
            {" "}
            <div class="offcanvas-header">
              {" "}
              <h5 class="offcanvas-title" id="offcanvasLabel">
                Aperture
              </h5>{" "}
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>{" "}
            </div>{" "}
            <div class="offcanvas-body">
              {" "}
              <ul class="navbar-nav flex-grow-1 justify-content-between">
                {" "}
                <li class="nav-item">
                  <a class="nav-link" href="#" aria-label="Aperture">
                    {" "}
                    <svg class="bi" width="24" height="24" aria-hidden="true">
                      <use xlink:href="#aperture"></use>
                    </svg>{" "}
                  </a>
                </li>{" "}
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Products
                  </a>
                </li>{" "}
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Categories
                  </a>
                </li>{" "}
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    Orders
                  </a>
                </li>{" "}
                <li class="nav-item">
                  <a class="nav-link" href="#">
                  <img src={logo} alt={logo} width="25" height="25" style={{ marginRight: '10px' }} />
                    Cart
                  </a>
                </li>{" "}
                <li class="nav-item">
                  <a class="nav-link" href="#" aria-label="Cart">
                    <img src={person} alt={person} width="25" height="25"/>
                  </a>
                </li>{" "}
              </ul>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </nav>
    </div>
  );
};

export default Product;
