import cart from "../assets/icons/cart.svg";

const LogoHeader = () => (
  <div className="text-center mb-6">
    <img
      className="mx-auto mb-3 w-14 h-14"
      src={cart}
      alt="logo"
      width="55"
      height="55"
    />
    <h2 className="font-sans mb-2">Welcome</h2>
    <p className="text-gray-800">
      Your next favorite find is just a click away — shop smart, live stylish.
    </p>
  </div>
);

export default LogoHeader;
