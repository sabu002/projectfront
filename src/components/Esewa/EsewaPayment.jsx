// EsewaPayment.jsx
import React, { useState } from "react";
import api from "../../API/axios"; // make sure the base URL is correct

const EsewaPayment = ({ amount, productId }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || amount <= 0) return alert("Invalid amount");

    setLoading(true);
    try {
      const res = await api.post("/initiate-payment", {
        amount,
        productId,
      });

      if (res.data?.url) {
        // Optionally save transactionId in local storage if you want to use it later
        localStorage.setItem("esewaTransactionId", res.data.transactionId);
        window.location.href = res.data.url;
      } else {
        alert("Failed to get payment URL");
      }
    } catch (err) {
      console.error("Esewa Payment Error:", err);
      alert("Error initiating payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePayment} className="max-w-md mx-auto p-6 bg-white shadow rounded space-y-4">
      <h2 className="text-xl font-bold text-green-600 text-center">Pay with eSewa</h2>
      <div>
        <label className="text-sm">Amount (NPR):</label>
        <input value={amount} readOnly className="w-full bg-gray-100 px-3 py-2 rounded border" />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded text-white ${loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"}`}
      >
        {loading ? "Processing..." : "Proceed to eSewa"}
      </button>
    </form>
  );
};

export default EsewaPayment;
