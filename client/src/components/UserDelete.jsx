import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const UserDelete = () => {
  const token = localStorage.getItem("token");

  const deleteAccount = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      axios
        .delete(`${baseUrl}/users`, {
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
    }
  };

  return (
    <div className="mb-3">
      <h5>Delete Account</h5>
      <p>You are about to delete your account.</p>
      <button type="submit" className="btn btn-dark" onClick={deleteAccount}>
        Submit
      </button>
    </div>
  );
};

export default UserDelete;
