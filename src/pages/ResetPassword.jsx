import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();
  const { axios, navigate } = useAppContext();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!password || password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    if (password !== confirm) {
      return toast.error("Passwords do not match.");
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`/api/user/reset-password/${token}`, { password });

      if (data.success) {
        toast.success(data.message);
        navigate("/"); // Redirect to login
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form
        onSubmit={handleReset}
        className="bg-white p-8 rounded shadow-md w-80 sm:w-[352px]"
      >
        <h2 className="text-2xl mb-4 font-semibold text-center">Reset Password</h2>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-gray-300 rounded w-full p-2 mb-4 outline-primary"
        />

        <input
          type="password"
          placeholder="Confirm new password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          className="border border-gray-300 rounded w-full p-2 mb-4 outline-primary"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white w-full py-2 rounded hover:bg-primary-dull transition"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
