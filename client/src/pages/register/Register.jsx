import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "../../components/InputField";

const Register = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [localPhone, setLocalPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const buildE164 = (tenDigitsTR) =>
    tenDigitsTR && tenDigitsTR.length === 10 ? `+90${tenDigitsTR}` : null;

  const handleRegisterEmail = async () => {
    setIsLoading(true);
    try {
      await axios.post("/api/v1/auth/register-email", {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      alert("Registration successful! Please click the verification link sent to your email.");
      navigate("/");
    } catch (error) {
      if (error.response?.status === 409) {
        alert("This email is already registered. Please try another one.");
      } else {
        console.error(error);
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

const handleRegisterSms = async () => {
  const phoneE164 = buildE164(localPhone);
  if (!phoneE164) {
    alert("Please enter a valid 10-digit Turkish number (e.g., 5XXXXXXXXX).");
    return;
  }
  setIsLoading(true);
  try {
    const payload = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      phone: phoneE164,
    };

    const resp = await axios.post("api/v1/auth/register-sms", payload);
    const token = resp.data?.data

    if (!token) {
      alert("Failed to get verification token. Please try again.");
      return;
    }

    const resendAfterSeconds = 60;

    sessionStorage.setItem("pendingRegisterData", JSON.stringify(payload));

    navigate("/register-sms", {
      state: { token, phoneE164, resendAfterSeconds },
      replace: true,
    });

  } catch (error) {
    const status = error.response?.status;
    if (status === 409) {
      alert("This email is already registered. Please try another one.");
    } else if (status === 400) {
      alert("Invalid phone number. Please use E.164 format (e.g., +905XXXXXXXXX).");
    } else {
      console.error(error);
      alert("Failed to send the code. Please try again.");
    }
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h5 className="mb-3 text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-3xl">
        Create an account
      </h5>

      <form className="w-full max-w-md" onSubmit={(e) => e.preventDefault()}>
        <InputField id="firstName" ref={firstNameRef} label="First Name" type="text" />
        <InputField id="lastName" ref={lastNameRef} label="Last Name" type="text" />
        <InputField id="email" ref={emailRef} label="Email Address" type="email" />
        <InputField id="password" ref={passwordRef} label="Password" type="password" />

        <div className="mt-2">
          <label htmlFor="phone-local" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <div className="flex items-stretch">
            <div className="inline-flex items-center gap-2 px-3 border border-r-0 rounded-l-lg bg-gray-100 text-gray-700">
              <span className="text-sm font-semibold">TR</span>
              <span className="text-xs text-gray-500">( +90 )</span>
            </div>
            <input
              id="phone-local"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="5XXXXXXXXX"
              value={localPhone}
              onChange={(e) =>
                setLocalPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              maxLength={10}
              className="flex-1 border border-l-0 rounded-r-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-800 border-gray-300"
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-2">
          <button
            type="button"
            onClick={handleRegisterEmail}
            disabled={isLoading}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg"
          >
            {isLoading ? "Processing..." : "Verify via email (send link)"}
          </button>

          <button
            type="button"
            onClick={handleRegisterSms}
            disabled={isLoading}
            className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 py-2 rounded-lg"
          >
            {isLoading ? "Processing..." : "Verify via SMS (send code)"}
          </button>
        </div>

        <p className="mt-3 text-center text-sm/6 text-gray-500">
          Already have an account?{" "}
          <Link to="/" className="font-semibold text-gray-800 hover:text-gray-900">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;