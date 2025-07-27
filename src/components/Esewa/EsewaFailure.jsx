import React from "react";
import { useNavigate } from "react-router-dom";

const EsewaFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-md text-center space-y-4 border border-red-200">
        <h1 className="text-2xl font-bold text-red-600">Payment Failed!</h1>
        <p className="text-gray-600">
          There was an issue with your payment. Please try again.
        </p>
        <button
          onClick={() => navigate("/payment-form")}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-200"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default EsewaFailure;