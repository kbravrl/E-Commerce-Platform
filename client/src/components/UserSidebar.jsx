import { ChevronRight } from "react-bootstrap-icons";

const UserSidebar = ({ menuItems, activeSection, setActiveSection }) => (
  <nav className="bg-white rounded-lg divide-y divide-gray-200 shadow-sm">
    {menuItems.map((item) => {
      const isActive = activeSection === item;
      return (
        <button
          key={item}
          onClick={() => setActiveSection(item)}
          className={`
            w-full flex items-center justify-between
            px-4 py-2 text-base font-medium
            transition-colors duration-150
            ${isActive
              ? "bg-gray-800 text-white"
              : "text-gray-700 hover:bg-gray-100"}
          `}
        >
          {item}
          <ChevronRight
            className={`
              w-5 h-7 transform transition-transform duration-150
              ${isActive ? "rotate-0" : "rotate-180"}
            `}
          />
        </button>
      );
    })}
  </nav>
);

export default UserSidebar;
