import { useState } from "react";
import axios from "axios";
import InputField from "./InputField";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const AccountUpdate = ({ userDetails, onUpdate }) => {
  const [firstName, setFirstName] = useState(userDetails.firstName || "");
  const [lastName, setLastName] = useState(userDetails.lastName || "");

  const handleUpdate = (e) => {
    e.preventDefault();

    axios
      .put(
        `${baseUrl}/users/update`,
        { firstName, lastName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        alert("User updated successfully!");
        onUpdate(res.data.data);
      })
      .catch((err) => {
        console.error("Error updating user:", err);
        alert("Update failed");
      });
  };

  return (
    <form onSubmit={handleUpdate}>
      <legend>Edit Account</legend>
      <div className="mb-3">
        <InputField
          id={"firstName"}
          label={"First Name"}
          type={"text"}
          placeholder={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <InputField
          id={"lastName"}
          label={"Last Name"}
          type={"text"}
          placeholder={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-dark" onClick={handleUpdate}>
        Submit
      </button>
    </form>
  );
};

export default AccountUpdate;
