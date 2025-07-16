import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserDetails from "../../components/UserDetails";
import UserSidebar from "../../components/UserSidebar";
import UserUpdate from "../../components/UserUpdate";
import UserDelete from "../../components/UserDelete";
import OrderLists from "../../components/OrderLists";
import ProductDelete from "../../components/ProductDelete";
import ProductAdd from "../../components/ProductAdd";
import ProductEdit from "../../components/ProductEdit";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const [activeSection, setActiveSection] = useState("Personal Information");

  const isAdmin =
    user.roles && user.roles.some((role) => role.name === "ROLE_ADMIN");

  const menuItems = ["Personal Information", "Edit Account", "Delete Account"];

  const finalMenuItems = isAdmin
    ? [...menuItems, "Add Product", "Edit Product", "Delete Product"]
    : menuItems;

  useEffect(() => {
    axios
      .get(`${baseUrl}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.data);
        setUser(response.data.data);
        setOrders(response.data.data.orders || []);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 mt-6 max-w-6xl">
        <h2 className="text-2xl mb-5 font-semibold text-gray-800">User Profile</h2>
        <div className="flex flex-col md:flex-row">
          <aside className="md:w-1/4 w-full mb-6 md:mb-0">
            <UserSidebar
              menuItems={finalMenuItems}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          </aside>
          <main className="md:w-3/4 w-full md:pl-12">
            <div className="space-y-6">
              {activeSection === "Edit Account" ? (
                <UserUpdate onUpdate={setUser} />
              ) : activeSection === "Delete Account" ? (
                <UserDelete />
              ) : activeSection === "Add Product" ? (
                <ProductAdd />
              ) : activeSection === "Edit Product" ? (
                <ProductEdit />
              ) : activeSection === "Delete Product" ? (
                <ProductDelete />
              ) : (
                <div className="space-y-6">
                  <UserDetails userDetails={user} />
                  <OrderLists orders={orders} />

                  <div>
                    <button
                      onClick={handleLogout}
                      className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-2 px-10 rounded mb-3 transition"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
