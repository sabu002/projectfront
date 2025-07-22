// pages/VerifyOtp.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const VerifyOtp = () => {
  const { axios } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp || !password) {
      return toast.error("Please enter OTP and new password.");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/api/user/verify-otp", {
        email,
        otp,
        password,
      });

      if (data.success) {
        toast.success("Password reset successful. Please log in.");
        navigate("/"); // change as needed
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-80 sm:w-[352px]"
      >
        <h2 className="text-2xl mb-4 font-semibold text-center">Verify OTP</h2>

        <label className="block mb-2">OTP Code</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit OTP"
          className="border border-gray-300 rounded w-full p-2 mb-4 outline-primary"
        />

        <label className="block mb-2">New Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
          className="border border-gray-300 rounded w-full p-2 mb-4 outline-primary"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white w-full py-2 rounded hover:bg-primary-dull transition"
        >
          {loading ? "Verifying..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
