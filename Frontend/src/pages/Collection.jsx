import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../contexts/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';
import ProductItems from '../components/ProductItems';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sorttype, setSorttype] = useState("Relevant");
  
  const sortProduct = () => {
  const fpCopy = [...products];

  switch (sorttype) {
    case "Low-High":
      setFilterProduct([...fpCopy].sort((a, b) => a.price - b.price));
      break;

    case "High-Low":
      setFilterProduct([...fpCopy].sort((a, b) => b.price - a.price));
      break;

    default:
      applyFilter();
      break;
    }
  };

  useEffect(() => {
    sortProduct()
  },[sorttype])

  const toggleCategory = (e) => {
    const value = e.target.value;

    setCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;

    setSubCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const applyFilter = () => {
    let productCopy = [...products];

    if (showSearch && search) {
      productCopy = productCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (category.length > 0) {
      productCopy = productCopy.filter(item =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productCopy = productCopy.filter(item =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProduct(productCopy);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, products, search, showSearch]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-500'>
      
      {/* Filter Panel */}
      <div className='min-w-60'>
        <p className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS
          <img
            onClick={() => setShowFilter(!showFilter)}
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            alt=""
          />
        </p>

        {/* Category */}
        <div className={`border border-gray-300 my-6 pl-5 py-3 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='text-sm font-medium mb-3'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm text-gray-700'>
            <label className='flex gap-2'>
              <input type="checkbox" value="Men" onChange={toggleCategory} />
              Men
            </label>
            <label className='flex gap-2'>
              <input type="checkbox" value="Women" onChange={toggleCategory} />
              Women
            </label>
            <label className='flex gap-2'>
              <input type="checkbox" value="Kids" onChange={toggleCategory} />
              Kids
            </label>
          </div>
        </div>

        {/* SubCategory */}
        <div className={`border border-gray-300 my-5 pl-5 py-3 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='text-sm font-medium mb-3'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm text-gray-700'>
            <label className='flex gap-2'>
              <input type="checkbox" value="Topwear" onChange={toggleSubCategory} />
              Topwear
            </label>
            <label className='flex gap-2'>
              <input type="checkbox" value="Bottomwear" onChange={toggleSubCategory} />
              Bottomwear
            </label>
            <label className='flex gap-2'>
              <input type="checkbox" value="Winterwear" onChange={toggleSubCategory} />
              Winterwear
            </label>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
          onChange={(e) => setSorttype(e.target.value)}
          className='border-2 border-gray-300 text-sm px-2'   
          >
            <option value="Relevant">
              <span className="hidden sm:inline">Sort by: </span>Relevant
            </option>
            <option value="Low-High">
              <span className="hidden sm:inline">Sort by: </span>Low to High
            </option>
            <option value="High-Low">
              <span className="hidden sm:inline">Sort by: </span>High to Low
            </option>
          </select>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {filterProduct.length > 0 ? (
          filterProduct.map((c, index) => (
            <ProductItems
              key={index}
              id={c._id}
              image={c.image}
              name={c.name}
              price={c.price}
            />
          ))
        ) : (
          <p className='col-span-full text-center text-gray-500 mt-10'>
            No items found.
          </p>
        )}
      </div>
      </div>
    </div>
  );
};

export default Collection;