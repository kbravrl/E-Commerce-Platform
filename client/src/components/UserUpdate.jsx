import { useRef } from "react";
import axios from "axios";
import InputField from "./InputField";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const UserUpdate = ({ onUpdate }) => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(
        `${baseUrl}/users`,
        {
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
        },
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
      <InputField
        id={"firstName"}
        ref={firstNameRef}
        label={"First Name"}
        type={"text"}
      />
      <InputField
        id={"lastName"}
        ref={lastNameRef}
        label={"Last Name"}
        type={"text"}
      />
      <button type="submit" className="btn btn-dark" onClick={handleUpdate}>
        Submit
      </button>
    </form>
  );
};

export default UserUpdate;
