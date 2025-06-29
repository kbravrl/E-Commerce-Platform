import cart from "../assets/icons/cart.svg";

const LogoHeader = () => {
  return (
    <>
      <div className="text-center mb-4">
        <img className="mb-4" src={cart} alt={cart} width="72" height="72" />
        <h1 className="h3 mb-3 font-weight-normal">Welcome</h1>
        <p>
          Your next favorite find is just a click away — shop smart, live
          stylish.
        </p>
      </div>
    </>
  );
};

export default LogoHeader;
