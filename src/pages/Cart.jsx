import { useState } from "react"
import { useAppContext } from "../context/AppContext"
import { assets, dummyAddress } from "../assets/assets"
import { useEffect } from "react"
import toast from "react-hot-toast"

const Cart = () => {
    const { products,currency,cartItems, removeFromCart, getCartCount, updateCartItem,navigate,getCartAmount,axios,user,setCartItems} = useAppContext()
    const [cartArray,setCartArray] = useState([])
    const [showAddress, setShowAddress] = useState(false)
        const [addresses, setAddresses] = useState([])
        const [selectedAddress,setSelectedAddress] = useState([])
        const [paymentOption,setPaymentOption] = useState("COD")

        const getCart = ()=>{
            let tempArray =[]
          for (const key in cartItems){
                const product = products.find((item)=> item._id===key)
                product.quantity= cartItems[key]
                tempArray.push(product)
            }
            setCartArray(tempArray)
        }
 const getUserAddress = async()=>{
    try{
        const{data}= await axios.get('/api/address/get');
        if(data.success){
            setAddresses(data.addresses)
            if(data.addresses.length>0){
                setSelectedAddress(data.addresses[0])
            }
        }else{
            toast.error(data.message)
        }
    }catch(error){
        toast.error(error.message)
    }
 }


        // const placeOrder= async()=>{
        //     try{
        //         if(!selectedAddress){
        //             return toast.error("please select an address")
        //         }
        //         // place order with COD
        //         if(paymentOption === "COD"){
        //             const{data}= await axios.post('/api/order/cod',{
        //                 userId: user._id,
        //                 items:cartArray.map(item=>({ 
        //                     product:item._id,quantity:item.quantity
        //                 })),
        //                 address:selectedAddress._id
        //             })
        //             if(data.success){
        //                 toast.success(data.message)
        //                 setCartItems({})
        //                 navigate('/my-orders')
        //             }else{
        //                 toast.error(data.message)
        //             }
        //         }
        //     }catch(error){
        //         toast.error(error.message)
        //     }

        // }
        // ⬇️  REPLACE your current placeOrder with this one
const placeOrder = async () => {
  try {
    if (!selectedAddress) {
      return toast.error("Please select an address");
    }

    /* ────────────────────────────────
       1.  CASH‑ON‑DELIVERY
    ──────────────────────────────── */
    if (paymentOption === "COD") {
      const { data } = await axios.post("/api/order/cod", {
        userId: user._id,
        items: cartArray.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        address: selectedAddress._id,
      });

      if (data.success) {
        toast.success(data.message);
        setCartItems({});
        navigate("/my-orders");
      } else {
        toast.error(data.message);
      }
      return; // ✅ nothing more to do for COD
    }

    /* ────────────────────────────────
       2.  eSEWA  (paymentOption === "Online")
    ──────────────────────────────── */
    const transactionId = `${Date.now()}_${user._id}`;
    const amountWithoutTax = getCartAmount();
    const totalAmount      = amountWithoutTax + amountWithoutTax * 0.02; // add 2 % tax

    const { data } = await axios.post("/api/checkout-session", {
      amount: +totalAmount.toFixed(2), // round & cast to number
      productName: "GreenCart Order",
      transactionId,
      method: "esewa",
    });

    if (!data.esewaConfig) {
      return toast.error("Failed to initiate eSewa payment.");
    }

    /*  Create a hidden HTML form and POST it to eSewa  */
    const esewaParams = {
      amt:  data.esewaConfig.total_amount,
      psc:  data.esewaConfig.product_service_charge,
      pdc:  data.esewaConfig.product_delivery_charge,
      txAmt:data.esewaConfig.tax_amount,
      tAmt: data.esewaConfig.total_amount,
      pid:  data.esewaConfig.transaction_uuid,
      scd:  data.esewaConfig.product_code,
      su:   data.esewaConfig.success_url,
      fu:   data.esewaConfig.failure_url,
      signature: data.esewaConfig.signature,
    };

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://epay.esewa.com.np/api/epay/main/v2/form";
    form.style.display = "none";

    Object.entries(esewaParams).forEach(([name, value]) => {
      const input = document.createElement("input");
      input.type  = "hidden";
      input.name  = name;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();         // 🔀 browser redirects to eSewa’s payment page
  } catch (err) {
    console.error("Payment error:", err);
    toast.error(
      err?.response?.data?.message ||
      err.message ||
      "Something went wrong."
    );
  }
};

        useEffect(()=>{
        if(products.length>0 && cartItems){
            let productsCopy = products.filter((item) => item.category === cartItems.category && item)
            setCartArray(productsCopy.slice(0, 5))
            getCart()
        }
        },[products,cartItems])
        useEffect(()=>{
        if(user){
            getUserAddress()
        }
        },[user])

    return products.length>0 && cartItems? (
        <div className="flex flex-col md:flex-row mt-16">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-primary">{getCartCount()}</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArray.map((product, index) => (
                    
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div  onClick={()=> {navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0,0)}} className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded">
                                <img  className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                           <div className="font-normal text-gray-500/70">
                                    <p>Weight: <span>{product.weight || "N/A"}</span></p>
                                    <div className='flex items-center'>
                                        <p>Qty:</p>
                                        <select onChange={e=>updateCartItem(product._id,Number(e.target.value))}  value={cartItems[product._id]}className='outline-none'>
                                            {Array(cartItems[product._id]>9?cartItems[product._id]:9).fill('').map((_, index) => (
                                                <option key={index} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">{currency}{product.offerPrice * product.quantity}</p>
                        <button onClick={()=>removeFromCart(product._id)} className="cursor-pointer mx-auto">
                          <img src={assets.remove_icon} alt="remove" className="inline-block w-6 h-6"/>
                        </button>
                    </div>)
                )}

                <button onClick={()=>{navigate('/products');scrollTo(0,0)}} className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium">
                    <img src={assets.arrow_right_icon_colored} alt="arrow" className="group-hover:-translate-x-1 transition "/>
                    Continue Shopping
                </button>

            </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">{selectedAddress? `${selectedAddress.area},${selectedAddress.city}`:"No address found"}</p>
                        <button onClick={() => setShowAddress(!showAddress)} className="text-primary hover:underline cursor-pointer">
                            Change
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                            { addresses.map((address,index)=>(<p onClick={() =>{setSelectedAddress(address); setShowAddress(false)}} className="text-gray-500 p-2 hover:bg-gray-100">
                                   {address.area},{address.city}
                                </p>)) }
                                <p onClick={() => {navigate('/add-address')}} className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10">
                                    Add address
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select onChange={e=> setPaymentOption(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>{currency}{getCartAmount()}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>{currency}{getCartAmount()*2/100}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>{currency}
                            { getCartAmount() +getCartAmount()*2/100}</span>
                    </p>
                </div>

                <button onClick={placeOrder} className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition">
                   {paymentOption ==="COD"?" Place Order":"Proceed to checkout"}
                </button>
            </div>
        </div>
    ):null
}
export default Cart