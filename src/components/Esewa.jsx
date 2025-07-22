import React from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import CryptoJS from "crypto-js";

const Esewa = () => {
  const [formData, setFormData] = useState({
    amount: 100,
    tax_amount: 10,
    total_amount: 110,
    transaction_uuid: uuid(),
    product_code: "EPAYTEST",
    success_url: "https://developer.esewa.com.np/success",
    failure_url: "https://developer.esewa.com.np/failure",
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: "",
    secret: "8gBm/:&EnhH.1/q",
  });

  //now lets create the signature

  const generateSignature = (
    total_amount,
    transaction_uuid,
    product_code,
    secret
  ) => {
    const hashString = `${total_amount}.${transaction_uuid}.${product_code}`;
    const hash = CryptoJS.HmacSHA256(hashString, secret);
    const hashedSignatureString = CryptoJS.enc.Hex.stringify(hash);
    return hashedSignatureString;
  };

  useEffect(() => {
    const { total_amount, transaction_uuid, product_code, secret } = formData;
    const signature = generateSignature(
      total_amount,
      transaction_uuid,
      product_code,
      secret
    );
    console.log(hashedSignatureString);

    //kam garrirako ch aki chiana vanerw ceck gara paiyena
    setFormData({ ...formData, signature: hashedSignatureString });
  }, [formData.amount]);

  return (
    <form
      action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
      method="POST"
    >
      <input
        type="text"
        id="amount"
        name="amount"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        required
      />
      <input
        type="text"
        id="tax_amount"
        name="tax_amount"
        value={formData.tax_amount}
        required
      />
      <input
        type="text"
        id="total_amount"
        name="total_amount"
        value={formData.total_amount}
        required
      />
      <input
        type="text"
        id="transaction_uuid"
        name="transaction_uuid"
        value={formData.transaction_uuid}
        required
      />
      <input
        type="text"
        id="product_code"
        name="product_code"
        value={formData.product_code}
        required
      />
      <input
        type="text"
        id="product_service_charge"
        name="product_service_charge"
        value={formData.product_service_charge || "0"}
        required
      />
      <input
        type="text"
        id="product_delivery_charge"
        name="product_delivery_charge"
        value={formData.product_delivery_charge || "0"}
        required
      />
      <input
        type="text"
        id="success_url"
        name="success_url"
        value={formData.success_url}
        required
      />
      <input
        type="text"
        id="failure_url"
        name="failure_url"
        value={formData.failure_url}
        required
      />
      <input
        type="text"
        id="signed_field_names"
        name="signed_field_names"
        value={formData.signed_field_names}
        required
      />
      <input
        type="text"
        id="signature"
        name="signature"
        value={CryptoJS.HmacSHA256(
          `${formData.total_amount}.${formData.transaction_uuid}.${formData.product_code}`,
          formData.secret
        ).toString(CryptoJS.enc.Hex)}
        onChange={(e) =>
          setFormData({ ...formData, signature: e.target.value })
        }
        required
      />
      <input value="Submit" type="submit" />
    </form>
  );
};

export default Esewa;


