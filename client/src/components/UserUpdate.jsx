import { useRef } from "react";
import axios from "axios";
import InputField from "./InputField";

const UserUpdate = ({ onUpdate }) => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();

  const updateUser = (e) => {
    e.preventDefault();
    axios
      .put(
        "/api/v1/users",
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
    <form onSubmit={updateUser}>
      <legend className="text-xl font-semibold text-gray-800">Edit Account</legend>
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
      <button type="submit" className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-medium px-7 py-2 rounded-md transition">
        Submit
      </button>
    </form>
  );
};

export default UserUpdate;
