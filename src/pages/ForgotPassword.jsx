import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const { axios, navigate } = useAppContext();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Please enter your email.");
    }

    setLoading(true);

  
    try {
      const { data } = await axios.post("/api/user/forgot-password", { email });
      if (data.success) {
        toast.success(data.message);
        navigate("/verify-otp", { state: { email } }); // ✅ go to OTP page
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
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
        <h2 className="text-2xl mb-4 font-semibold text-center">
          Forgot Password
        </h2>
        <label className="block mb-2" htmlFor="email">
          Enter your email address
        </label>
        <input
          id="email"
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 rounded w-full p-2 mb-4 outline-primary"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white w-full py-2 rounded hover:bg-primary-dull transition"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
