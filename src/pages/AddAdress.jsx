import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { useEffect } from "react";
//input field Component
const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className="w-full px-2 py-2 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
  />
);

const AddAdress = () => {
  const { axios, user, navigate } = useAppContext();
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    area: "",
    city: "",
    path: "",
    phone: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/address/add", {
        address,
        userId: user._id,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    console.log(user);
    if (!user) {
      navigate("/cart");
    }
  }, []);
  return (
    <div className="mt-16 pb-16 ">
      <p className="text-2xl md:text-3xl text-gray-500">
        {" "}
        Add Shipping{" "}
        <span className="font-semibold text-primary"> Address</span>
      </p>
      <div className=" flex flex-col-reverse md:flex-row justify-between mt-10">
        <div className=" flex-1 max-w-md">
          <form onSubmit={onSubmitHandler} className="space-y-3 mt-6 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="firstName"
                type="text"
                placeholder="first Name"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="lastName"
                type="text"
                placeholder="last Name"
              />
            </div>
            <div>
              <InputField
                handleChange={handleChange}
                address={address}
                name="email"
                type="email"
                placeholder="Email Address"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="area"
                type="text"
                placeholder="area"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="path"
                type="text"
                placeholder="path"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="city"
                type="text"
                placeholder="city"
              />
            </div>
            <InputField
              handleChange={handleChange}
              address={address}
              name="phone"
              type="text"
              placeholder="phone"
            />

            <button className=" w-full mt-6 bg-primary text-white py-3 hover:border-primary-dull transition cursor-pointer">
              {" "}
              Save address
            </button>
          </form>
        </div>
        <img
          className="md:mr-16 mb-16 md:mt-0"
          src={assets.add_address_iamge}
          alt="add adress"
        />
      </div>
    </div>
  );
};

export default AddAdress;
