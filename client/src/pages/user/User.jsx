import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import AccountDetails from "../../components/AccountDetails";
import AccountSidebar from "../../components/AccountSidebar";
import AccountUpdate from "../../components/AccountUpdate";
import OrderLists from "../../components/OrderLists";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const UserProfile = () => {
  const [user, setUser] = useState([]);
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const [activeSection, setActiveSection] = useState("Personal Information");

  const menuItems = ["Personal Information", "Edit Account", "Delete Account"];

  useEffect(() => {
    axios
      .get(`${baseUrl}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data.data);
        setOrders(response.data.data.orders || []);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [token]);

  useEffect(() => {
    if (activeSection === "Delete Account") {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete your account?"
      );
      if (confirmDelete) {
        axios
          .delete(`${baseUrl}/users/delete`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            alert("Account deleted successfully.");
            localStorage.removeItem("token");
            window.location.href = "/";
          })
          .catch((err) => {
            console.error("Error deleting account:", err);
            alert("Failed to delete account.");
          });
      } else {
        setActiveSection("Personal Information");
      }
    }
  }, [activeSection]);

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
            <AccountSidebar
              menuItems={menuItems}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          </div>
          <div className="col-md-9" style={{ paddingLeft: "70px" }}>
            <div className="mb-5">
              {activeSection === "Edit Account" ? (
                <AccountUpdate userDetails={user} onUpdate={setUser} />
              ) : (
                <>
                  <AccountDetails userDetails={user} />
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
