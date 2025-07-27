
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

const getUnique = (arr, key) => [...new Set(arr.map(item => item[key]))];

const AllProduct = () => {
  const { products, searchQuery, filteredProducts, setFilteredProducts } = useAppContext();
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [selectedPrice, setSelectedPrice] = useState([0, 0]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);

  // Get min/max price for slider
  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map(p => p.offerPrice || p.price || 0);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setPriceRange([min, max]);
      setSelectedPrice([min, max]);
    }
  }, [products]);

  // Filter logic
  useEffect(() => {
    let filtered = products;
    // Search
    if (searchQuery.length > 0) {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    // Price
    filtered = filtered.filter(product => {
      const price = product.offerPrice || product.price || 0;
      return price >= selectedPrice[0] && price <= selectedPrice[1];
    });
    // Category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }
    // Rating
    if (selectedRating > 0) {
      filtered = filtered.filter(product => Math.round(product.rating || 0) >= selectedRating);
    }
    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedPrice, selectedCategories, selectedRating, setFilteredProducts]);

  // Category list
  const categories = getUnique(products, 'category');

  // Responsive sidebar toggle
  const handleSidebar = () => setShowSidebar(!showSidebar);

  // Price slider handler
  const handlePriceChange = (e, idx) => {
    const val = Number(e.target.value);
    setSelectedPrice(idx === 0 ? [val, selectedPrice[1]] : [selectedPrice[0], val]);
  };

  // Category checkbox handler
  const handleCategoryChange = (cat) => {
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  // Rating radio handler
  const handleRatingChange = (val) => setSelectedRating(val);

  return (
    <div className='mt-30 flex flex-col md:flex-row gap-6'>
      {/* Sidebar */}
      <div className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-white border-r border-gray-200 p-6 transition-transform duration-200 md:translate-x-0 ${showSidebar ? 'translate-x-0' : '-translate-x-full'} md:block`}> 
        <div className='flex justify-between items-center mb-6 md:hidden'>
          <span className='text-lg font-semibold'>Filters</span>
          <button onClick={handleSidebar} className='text-2xl'>&times;</button>
        </div>
        <div className='mb-6'>
          <h3 className='font-semibold mb-2'>Price</h3>
          <div className='flex items-center gap-2'>
            <input type='range' min={priceRange[0]} max={priceRange[1]} value={selectedPrice[0]} onChange={e => handlePriceChange(e, 0)} className='w-20'/>
            <span className='text-sm'>{selectedPrice[0]}</span>
            <span>-</span>
            <input type='range' min={priceRange[0]} max={priceRange[1]} value={selectedPrice[1]} onChange={e => handlePriceChange(e, 1)} className='w-20'/>
            <span className='text-sm'>{selectedPrice[1]}</span>
          </div>
        </div>
        <div className='mb-6'>
          <h3 className='font-semibold mb-2'>Category</h3>
          <div className='flex flex-col gap-1'>
            {categories.map(cat => (
              <label key={cat} className='flex items-center gap-2'>
                <input type='checkbox' checked={selectedCategories.includes(cat)} onChange={() => handleCategoryChange(cat)} />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Rating filter removed as per request */}
      </div>

      {/* Sidebar toggle button for mobile */}
      <button onClick={handleSidebar} className='md:hidden fixed top-20 left-2 z-50 bg-primary text-white px-3 py-2 rounded shadow'>
        Filters
      </button>

      {/* Main content */}
      <div className='flex-1'>
        <div className='flex flex-col items-end w-max'>
          <p className='text-2xl font-medium uppercase'> All products</p>
          <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
          {filteredProducts.filter((product) => product.inStock).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllProduct