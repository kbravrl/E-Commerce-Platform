import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
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
    window.location.href = "/";
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>User Profile</h2>
        </div>
        <div className="row">
          <div className="col-md-3 mt-3">
            <UserSidebar
              menuItems={finalMenuItems}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          </div>
          <div className="col-md-9" style={{ paddingLeft: "70px" }}>
            <div className="mb-5">
              {activeSection === "Edit Account" ? (
                <UserUpdate userDetails={user} onUpdate={setUser} />
              ) : activeSection === "Delete Account" ? (
                <UserDelete />
              ) : activeSection === "Add Product" ? (
                <ProductAdd />
              ) : activeSection === "Edit Product" ? (
                <ProductEdit />
              ) : activeSection === "Delete Product" ? (
                  <ProductDelete />
              ) : (
                <div>
                  <UserDetails userDetails={user} />
                  <OrderLists orders={orders} />
                  <div className="text-start mt-4">
                    <button
                      type="button"
                      className="btn btn-warning mt-3 px-5"
                      onClick={handleLogout}
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
