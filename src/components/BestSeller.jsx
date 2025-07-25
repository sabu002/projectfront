import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'
import { useEffect } from 'react';
import axios from 'axios';

const BestSeller = () => {
    const { products, user } = useAppContext();
    useEffect(() => {
      if (!user || !user._id) return;
      const fetchRecommendations = async () => {
        try {
          const res = await axios.get(`http://localhost:2000/api/recommend/${user._id}`);
          setRecommended(res.data.recommendations);
        } catch (error) {
          // Optionally handle error (e.g., user not found)
        }
      };
      fetchRecommendations();
    }, [user]);

  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'> Best Seller</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
        
        {products.filter((product)=>product.inStock).slice(0,5).map((product,index)=>(<ProductCard key={index} product={product}/>))} 
           
      
      </div>
    </div>
  )
}

export default BestSeller
