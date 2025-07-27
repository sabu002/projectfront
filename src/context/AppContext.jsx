import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";
import api from "../API/axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Fetch user auth & cart
  const fetchUser = async () => {
    try {
      const { data } = await api.get("/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems);
      }
    } catch (err) {
      setUser(null);
    }
  };

  // ✅ Fetch seller auth
  const fetchSeller = async () => {
    try {
      const { data } = await api.get("/seller/is-auth");
      setIsSeller(data.success);
    } catch {
      setIsSeller(false);
    }
  };

  // ✅ Fetch admin auth
  const fetchAdmin = async () => {
    try {
      const { data } = await api.get("/admin/is-auth");
      setIsAdmin(data.success);
    } catch {
      setIsAdmin(false);
    }
  };

  // ✅ Fetch all products
  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/product/list");
      if (data.success) {
        setProducts(data.products);
        setFilteredProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ✅ Search products
  useEffect(() => {
    const fetchSearch = async () => {
      if (!searchQuery) {
        setFilteredProducts(products);
        return;
      }
      try {
        const { data } = await api.get(`/product/search?query=${encodeURIComponent(searchQuery)}`);
        if (data.success) {
          setFilteredProducts(data.products);
        } else {
          setFilteredProducts([]);
          toast.error(data.message);
        }
      } catch (err) {
        setFilteredProducts([]);
        toast.error(err.message);
      }
    };

    fetchSearch();
  }, [searchQuery, products]);

  // ✅ Cart operations
  const addToCart = (itemId) => {
    if (!user) {
      toast.error("Please login to add items.");
      setShowUserLogin(true);
      return;
    }

    const updatedCart = { ...cartItems, [itemId]: (cartItems[itemId] || 0) + 1 };
    setCartItems(updatedCart);
    toast.success("Item added to cart");
  };

  const updateCartItem = (itemId, quantity) => {
    const updatedCart = { ...cartItems, [itemId]: quantity };
    setCartItems(updatedCart);
    toast.success("Cart updated");
  };

  const removeFromCart = (itemId) => {
    const updatedCart = { ...cartItems };
    if (updatedCart[itemId]) {
      updatedCart[itemId] -= 1;
      if (updatedCart[itemId] === 0) {
        delete updatedCart[itemId];
      }
    }
    setCartItems(updatedCart);
    toast.success("Item removed");
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);
  };

  const getCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const item = products.find((p) => p._id === itemId);
      if (item) {
        total += item.offerPrice * cartItems[itemId];
      }
    }
    return Math.floor(total * 100) / 100;
  };

  // ✅ Update cart to server
  useEffect(() => {
    const updateCart = async () => {
      try {
        const { data } = await axios.post("/api/cart/update", { cartItems });
        if (!data.success) toast.error(data.message);
      } catch (err) {
        toast.error(err.message);
      }
    };
    if (user) updateCart();
  }, [cartItems]);

  // ✅ Initial fetch
  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchAdmin();
    fetchProducts();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    isAdmin,
    setIsAdmin,
    showUserLogin,
    setShowUserLogin,
    products,
    setProducts,
    filteredProducts,
    setFilteredProducts,
    cartItems,
    setCartItems,
    searchQuery,
    setSearchQuery,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    getCartCount,
    getCartAmount,
    fetchProducts,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// ✅ Custom hook
const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext };
