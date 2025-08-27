import { useState, useEffect } from "react";
import logo from "../assets/icons/cart2.png";
import user from "../assets/icons/person.png";
import axios from "axios";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get("/api/v1/categories")
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <nav className="bg-gray-900">
      <div className="container flex items-center justify-evenly p-6 space-x-10 ">
        <a href="#">
          <img src={logo} alt="Logo" width="30" height="30" />
        </a>
        <a href="/products" className="text-white no-underline hover:underline">
          Products
        </a>
        <div className="relative">
          <button
            onClick={() => setIsOpen((o) => !o)}
            className="inline-flex justify-center items-center text-white"
          >
            Categories
            <svg
              className={`w-4 h-4 ml-2 transition-transform ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isOpen && (
            <div
              className="absolute text-center right-0 mt-2 px-1 w-48 bg-gray-900 z-50"
              role="menu"
            >
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`/category/${cat.name}`}
                  className="block py-2 text-white hover:bg-gray-800 no-underline hover:rounded-full"
                  role="menuitem"
                  tabindex="-1"
                  id={cat.id}
                >
                  {cat.name}
                </a>
              ))}
            </div>
          )}
        </div>
        <a href="/orders" className="text-white no-underline hover:underline">
          Orders
        </a>
        <a href="/cart" className="text-white no-underline hover:underline">
          Cart
        </a>
        <a href="/user" aria-label="User">
          <img src={user} alt="User" width="28" height="25" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
