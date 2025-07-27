// import { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useAppContext } from "../context/AppContext";
// import toast from "react-hot-toast";

// const PaymentSuccess = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { axios, setCartItems } = useAppContext();

//   useEffect(() => {
//     const verifyPayment = async () => {
//       const params = new URLSearchParams(location.search);
//       const transactionUuid = params.get("transaction_uuid");

//       if (!transactionUuid) {
//         toast.error("Missing transaction ID");
//         return navigate("/");
//       }

//       try {
//         const { data } = await axios.post("/payment/payment-status", {
//           productId: transactionUuid,
//           status: "SUCCESS",
//         });

//         if (data.status === "COMPLETED") {
//           toast.success("Payment successful!");
//           setCartItems({}); // Clear cart in frontend
//           navigate("/my-orders");
//         } else {
//           toast.error("Payment failed or incomplete.");
//           navigate("/");
//         }
//       } catch (error) {
//         toast.error("Error verifying payment");
//         navigate("/");
//       }
//     };

//     verifyPayment();
//   }, [location.search, navigate, axios, setCartItems]);

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <p className="text-lg font-medium">Verifying payment, please wait...</p>
//     </div>
//   );
// };

// export default PaymentSuccess;
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import api from "../API/axios";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { axios, setCartItems } = useAppContext();

  useEffect(() => {
    const verifyPayment = async () => {
      const params = new URLSearchParams(location.search);
      const transactionUuid = params.get("transaction_uuid");
      const dataParam = params.get("data");

      if (!transactionUuid) {
        toast.error("Missing transaction ID");
        return navigate("/");
      }

      let parsedData = {};
      if (dataParam) {
        try {
          parsedData = JSON.parse(decodeURIComponent(dataParam));
        } catch (e) {
          console.warn("Invalid data param:", e);
        }
      }

      try {
        const { data } = await api.post("/payment/payment-status", {
          productId: transactionUuid,
          status: parsedData?.status || "SUCCESS", // fallback to "SUCCESS"
        });

        if (data.status === "COMPLETED") {
          toast.success("Payment successful!");
          setCartItems({}); // Clear cart
          navigate("/my-orders");
        } else {
          toast.error("Payment incomplete.");
          navigate("/");
        }
      } catch (error) {
        toast.error("Error verifying payment");
        console.error("Payment verification failed:", error);
        navigate("/");
      }
    };

    verifyPayment();
  }, [location.search, navigate, axios, setCartItems]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg font-medium">Verifying payment, please wait...</p>
    </div>
  );
};

export default PaymentSuccess;

