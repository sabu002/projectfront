import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import { useAppContext } from './context/AppContext'

import AllProduct from './pages/AllProduct'
import ProductCategories from './pages/productCategories'
import ProductDetails from './pages/ProductDetail'
import Cart from './pages/Cart';
import AddAdress from './pages/AddAdress'
import Login from './components/Login'
import SellerLogin from './components/seller/SellerLogin'
import SellerLayout from './pages/seller/SellerLayout'
import AddProduct from './pages/seller/AddProduct'
import ProductList from './pages/seller/ProductList'
import Orders from './pages/seller/Orders'
import MyOrder from './pages/MyOrder'
// import Esewa from './components/Esewa'
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from './pages/ResetPassword'
import VerifyOtp from './pages/VerifyOtp'
import PaymentSuccess from './pages/PaymentSuccess'
import About from './pages/About'
import ContactSection from './pages/ContactSection'
import SubmitReview from './pages/SubmitReview'
import ReviewSection from './components/ReviewSection'
import AdminProduct from './pages/admin/AdminProduct'
import AdminOrder from './pages/admin/AdminOrder'
import AdminLayout from './pages/admin/Adminlayout'
import AdminLogin from './components/admin/AdminLogin'
import EsewaSuccess from './components/Esewa/EsewaSuccess'


const App = () => {
  const isSellerpath = useLocation().pathname.includes("seller");
    const isAdminPath = useLocation().pathname.includes("admin");
  const {showUserLogin ,isSeller,isAdmin} = useAppContext()
  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
       <Toaster/>


       { (!isSellerpath && !isAdminPath) && <Navbar /> }
       {showUserLogin ? <Login/>:null }

    <div className={`${isSellerpath && isAdminPath  ? "":"px-6 md:px-16 lg:px-24 xl:px-32"}`} >
      
    <Routes>
      <Route path='/' element={<Home/>}/> 
     <Route path='/products' element={<AllProduct/>}/>
     <Route path="/about" element={<About />}/>
     <Route path='/contact' element={<ContactSection />}/>
       <Route path='/products/:category' element={<ProductCategories/>}/>
       <Route path="/forgetpassword" element={<ForgotPassword />} />
       <Route path="/verify-otp" element={<VerifyOtp />} />

       <Route path="/reset-password/:token" element={<ResetPassword />} />

     <Route path='/products/:category/:id' element={<ProductDetails/>}/>
     <Route path='/cart' element={<Cart/>}/>
     <Route path='/add-address' element={<AddAdress/>}/>
     <Route path='/my-orders' element={<MyOrder/>}/>
     {/* <Route path="/payment/success" element={< PaymentSuccess/>} /> */}
     <Route path="/payment-success" element={<EsewaSuccess />}/>
   {/* for seller */}
     <Route path='/seller' element={isSeller? <SellerLayout/>:<SellerLogin/>}>
     {/* <Route path='/seller/payment' element={ <SellerLogin />} /> */}
     
     <Route index element={isSeller?<AddProduct/>:null}/>
     <Route path='product-list' element={<ProductList/>}/>
    
     <Route path='orders' element={<Orders/>}/>
     

    
     </Route>
     {/* for admin */}
         <Route path='/admin' element={isAdmin ? <AdminLayout /> : <AdminLogin />}>
         
            <Route path='product-list' element={<AdminProduct />} />
            <Route path='orders' element={<AdminOrder/>}/>
            {/* Add more admin routes here */}
          </Route>
     

     <Route path="/submit-review" element={<SubmitReview />} />
<Route path="/reviews" element={<ReviewSection />} />
    </Routes>
    
    </div>
 
    {/* Show Footer only if NOT on seller or admin path */}
    { (!isSellerpath && !isAdminPath) && <Footer /> }
    </div>
  )
}

export default App
