import { ChevronRight } from "react-bootstrap-icons";

const AccountSidebar = ({ menuItems, activeSection, setActiveSection }) => {
  return (
    <div className="list-group">
      {menuItems.map((item) => (
        <button
          key={item}
          className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
            activeSection === item ? "active bg-dark text-white" : ""
          }`}
          onClick={() => setActiveSection(item)}
          style={{
            border: "1px solid #ddd",
            borderRadius: "0",
            textAlign: "left",
          }}
        >
          {item}
          <ChevronRight />
        </button>
      ))}
    </div>
  );
};

export default AccountSidebar;
