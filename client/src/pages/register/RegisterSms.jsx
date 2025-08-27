import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterSms = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initial = location.state || {};
  const initialTimeLeft =
    typeof initial.resendAfterSeconds === "number" && initial.resendAfterSeconds > 0
      ? initial.resendAfterSeconds
      : 60;

  const [token, setToken] = useState(initial.token || "");
  const [phoneE164, setPhoneE164] = useState(initial.phoneE164 || "");
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    if (!token || !phoneE164) {
      const payloadStr = sessionStorage.getItem("pendingRegisterData");
      if (payloadStr) {
        const payload = JSON.parse(payloadStr);
        if (!phoneE164 && payload.phone) setPhoneE164(payload.phone);
        
      }
    }
  }, [token, phoneE164]);

  useEffect(() => {
    if (!timeLeft || timeLeft <= 0) return;
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timeLeft]);

  const masked = useMemo(() => {
    const p = phoneE164 || "";
    return p ? `${p.slice(0, 4)}***${p.slice(-2)}` : "";
  }, [phoneE164]);

  const handleConfirm = async () => {
    if (!token) {
      alert("Operation failed. Please request a new SMS code.");
      return;
    }
    const trimmed = code.trim();
    if (!trimmed || trimmed.length < 4) {
      alert("Please enter the SMS verification code.");
      return;
    }
    setIsLoading(true);
    try {
      await axios.post("/api/v1/auth/confirm-sms", { token, code: trimmed });
      alert("Phone verified. Your account has been created!");
      sessionStorage.removeItem("pendingRegisterData");
      navigate("/");
    } catch (error) {
      const status = error.response?.status;
      if (status === 400 || status === 404) {
        alert("The code is incorrect or has expired.");
      } else {
        console.error(error);
        alert("Verification failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (timeLeft > 0) return;

    const payloadStr = sessionStorage.getItem("pendingRegisterData");
    if (!payloadStr) {
      alert("Form data not found. Please start over.");
      navigate("/register");
      return;
    }

    try {
      setIsLoading(true);
      const payload = JSON.parse(payloadStr);
      const resp = await axios.post("/api/v1/auth/register-sms", payload);
      const newToken = resp.data?.data

      if (!newToken) {
        alert("Failed to get a new token. Please try again.");
        return;
      }

      const resendAfterSeconds = 60; 

      setToken(newToken);
      setTimeLeft(resendAfterSeconds);
      setCode("");

      if (!phoneE164 && payload.phone) setPhoneE164(payload.phone);
      alert("A new verification code has been sent. Please check your SMS.");
    } catch (error) {
      console.error(error);
      alert("The code could not be sent. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h5 className="mb-2 text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-3xl">
        SMS Verification
      </h5>
      <p className="text-sm text-gray-600 mb-3">
        {masked ? `We sent the code to ${masked}.` : "Phone number not found."}
      </p>

      <div className="w-full max-w-md mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          SMS verification code
        </label>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\s/g, ""))}
          inputMode="numeric"
          maxLength={6}
          placeholder="6-digit code"
          className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-800"
        />

        <div className="flex items-center justify-between mt-3">
          <button
            type="button"
            onClick={handleResend}
            disabled={timeLeft > 0 || isLoading}
            className={`text-sm ${
              timeLeft > 0 ? "text-gray-400" : "text-gray-800 hover:underline"
            }`}
            title={timeLeft > 0 ? `You can resend in ${timeLeft}s` : "Resend code"}
          >
            {timeLeft > 0 ? `Resend in ${timeLeft}s` : "Resend code"}
          </button>
        </div>

        <button
          type="button"
          onClick={handleConfirm}
          disabled={isLoading}
          className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg mt-4"
        >
          {isLoading ? "Verifying..." : "Verify Code & Create Account"}
        </button>

        <p className="mt-3 text-center text-sm/6 text-gray-500">
          Already have an account?{" "}
          <Link to="/" className="font-semibold text-gray-800 hover:text-gray-900">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterSms;
