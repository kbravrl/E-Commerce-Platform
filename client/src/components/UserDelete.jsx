import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const UserDelete = () => {
  const token = localStorage.getItem("token");

  const deleteUser = () => {
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
    <form onSubmit={deleteUser}>
      <legend className="text-xl font-semibold text-gray-800">Delete Account</legend>
      <p className="text-gray-800">You are about to delete your account.</p>
      <button type="submit" className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-medium px-7 py-2 rounded transition">
        Submit
      </button>
    </form>
  );
};

export default UserDelete;
