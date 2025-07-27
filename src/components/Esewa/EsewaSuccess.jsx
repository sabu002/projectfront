// ✅ FILE: src/pages/payment/EsewaSuccess.jsx

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { base64Decode } from "esewajs";
import api from "../../API/axios";

const EsewaSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const encoded = queryParams.get("data");
    console.log("Encoded data param:", encoded);

    if (!encoded) return setStatus("error");

    const decoded = base64Decode(encoded);

    const verify = async () => {
      console.log("Sending payment status data:", {
        transactionId: decoded.transaction_uuid,
      });
      try {
        const res = await api.post(
          "/payment-status",
          { transactionId: decoded.transaction_uuid },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status === 200) {
          const orderData =
            JSON.parse(localStorage.getItem("esewaOrder")) ||
            JSON.parse(sessionStorage.getItem("esewaOrder"));

          const token =
            localStorage.getItem("token") || sessionStorage.getItem("token");

          // if (orderData && token) {
          //   await api.post(
          //     "/orders/esewa/place",
          //     {
          //       transactionId: decoded.transaction_uuid,
          //       orderData: { items: orderData.orderItems },
          //       shippingAddress: orderData.shippingAddress,
          //       totalPrice: orderData.totalPrice,
          //       payMethod: "esewa",
          //     },
          //     { headers: { Authorization: `Bearer ${token}` } }
          //   );

          //   localStorage.removeItem("esewaOrder");
          //   sessionStorage.removeItem("esewaOrder");
          // }

          setStatus("success");
          navigate("/");
        } else {
          setStatus("error");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("error");
      }
    };

    verify();
  }, [location]);

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        navigate("/my-orders");
      }, 3000); // optional: auto-redirect after 3s
      return () => clearTimeout(timer);
    }
  }, [status, navigate]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        <div>🔄 Verifying your payment...</div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center p-10 bg-red-50 min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-red-600">❌ Payment Failed</h2>
        <p className="mt-2 text-gray-600">
          We couldn’t confirm your payment. Please try again later.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="text-center p-10 bg-green-50 min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-green-600">
        ✅ Payment Successful!
      </h2>
      <p className="mt-2 text-gray-700">
        Thank you for your payment. Your order has been placed.
      </p>
      <button
        onClick={() => navigate("/my-orders")}
        className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        View Orders
      </button>
    </div>
  );
};

export default EsewaSuccess;
