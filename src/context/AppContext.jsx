import {  createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from 'axios';
// import Fuse from 'fuse.js';


axios.defaults.baseURL= import.meta.env.VITE_BACKEND_URL;
export const AppContext = createContext();

axios.defaults.withCredentials= true;
export const AppContextProvider = ({children})=>{
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate= useNavigate();
    const[user,setUser]= useState(null)
    const[isSeller,setIsSeller]=useState(false)
    const [showUserLogin, setShowUserLogin]= useState(false)

    const [products, setProducts]= useState([])
    const[cartItems,setCartItems]=useState({})
    const[searchQuery,setSearchQuery]=useState({})
    const [filteredProducts, setFilteredProducts] = useState([]);

    

    // fetch seller status
    const fetchSeller = async()=>{
        try{
            const{data}= await axios.get('/api/seller/is-auth');
            if(data.success){
                setIsSeller(true)
            }else{
                setIsSeller(false)
            }
        }catch(error){
        setIsSeller(false)
        }
    }
   //fetch User Auth Stauts,user data and cart items
   const fetchUser = async()=>{
    try{
        const {data}= await axios.get('/api/user/is-auth');
        if(data.success){
            setUser(data.user)
            setCartItems(data.user.cartItems)
        }

    }catch(error){
        setUser(null)
    }
   }

    //fetch all product 
    const fetchProducts= async()=>{
        try{
         const {data}= await axios.get('/api/product/list')
         if(data.success){
            setProducts(data.products)
         }else{
            toast.error(data.message)
         }
        }catch(error){

            toast.error(error.message)
        }
    }
    useEffect(() => {
      const fetchSearch = async () => {
        if (!searchQuery || searchQuery.length === 0) {
          setFilteredProducts(products);
          return;
        }
        try {
          const { data } = await axios.get(`/api/product/search?query=${encodeURIComponent(searchQuery)}`);
          if (data.success) {
            setFilteredProducts(data.products);
          } else {
            setFilteredProducts([]);
            toast.error(data.message);
          }
        } catch (error) {
          setFilteredProducts([]);
          toast.error(error.message);
        }
      };
      fetchSearch();
    }, [searchQuery]);



const addToCart = (itemId) => {
  if (!user) {
    toast.error("Please login to add items to your cart.");
    setShowUserLogin(true); // if you're using a login modal
    return;
  }

  let cartData = structuredClone(cartItems);

  if (cartData[itemId]) {
    cartData[itemId] += 1;
  } else {
    cartData[itemId] = 1;
  }

  setCartItems(cartData);
  console.log('The data is', cartData);
  toast.success("Item added to cart");
};

// Update cart item quantity
const updateCartItem =(itemId,quantity)=>{
    let cartData = structuredClone(cartItems);
    cartData[itemId]= quantity;
    setCartItems(cartData);
    console.log('The update data is ', cartData)
  toast.success("cart updated sucessfully")
}
// remove product from cart
const removeFromCart=(itemId)=>{
    let cartData=structuredClone(cartItems);
    if(cartData[itemId]){
        cartData[itemId]-=1;
        if(cartData[itemId]===0){
            delete cartData[itemId];

        }
            
        }
        toast.success("cart deleted  successfully")


        setCartItems(cartData)
    
}
 //get Cart item count
//voli herum hai aba 

 const getCartCount = ()=>{
    let totalCount= 0
    for (const item in cartItems)
    {
        totalCount+= cartItems[item]
    }
    return totalCount;
 }
// get cart total amount
const getCartAmount = ()=>{
    let totalAmount= 0
    for (const items in cartItems){
        let itemInfo = products.find((product)=>product._id ===items);
        if(cartItems[items]>0){
            totalAmount +=itemInfo.offerPrice* cartItems[items]
        }
    }
    return Math.floor(totalAmount* 100)/100;
}





    useEffect(()=>{
        fetchUser()
        fetchSeller()
fetchProducts()
    },[])

    useEffect(()=>{
    const updateCart = async()=>{
       try{
        const{data}= await axios.post('/api/cart/update',{cartItems})
        if(!data.success){
            toast.error(data.message)
        }
       } catch(error){
        toast.error(error.message)
       }
    }
    if(user){
        updateCart()
    }
    
    },[cartItems])

    const value ={navigate,user,setUser,isSeller,setIsSeller ,showUserLogin,setShowUserLogin,products,currency, addToCart,updateCartItem,removeFromCart,cartItems,searchQuery,setSearchQuery,getCartAmount,getCartCount,axios,fetchProducts,setCartItems,filteredProducts,setFilteredProducts

    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}
export const useAppContext =()=>{
    return useContext(AppContext)
}