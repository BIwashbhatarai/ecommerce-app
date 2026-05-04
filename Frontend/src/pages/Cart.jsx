import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../contexts/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import CartAmount from '../components/CartAmount';

const Cart = () => {
  const {cartItem, currency, products, updateQuantity, navigate} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    let tempData = [];
    for (const items in cartItem) {
      for(const item in cartItem[items]) {
        if(cartItem[items][item] > 0) {
          tempData.push({
            _id : items,
            size: item,
            quantity: cartItem[items][item]
          });
        };
      };
    };
    setCartData(tempData)

  }, [cartItem]);

  return ( 
    <>
    {cartData.length > 0 ? (<div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={"YOUR "} text2={"CART"}/>
      </div>

      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);

            return (
            <div key={index} className='py-4  text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm: grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
              <div className='flex items-start gap-6'>
                <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                <div>
                  <p className='text-sm sm:text-lg font-medium'>{productData.name}</p>
                  <div className='flex gap-5 items-center mt-2'>
                    <p>{currency}{productData.price}</p>
                    <p className='px-2 sm:px-3 sm:py-1 bg-slate-50'>{item.size}</p>
                  </div>
                </div>
              </div>
              <input min={1} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' 
              onChange={(e) => {
              const raw = e.target.value;
              if (raw === '') return;
              const value = Number(raw);
              updateQuantity(item._id, item.size, value)}} defaultValue={item.quantity} type="number" />
              <img onClick={() => updateQuantity(item._id, item.size, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src= {assets.bin_icon} alt="" />
            </div>
          )
          })
        }
        {cartData.length > 0 && (
          <div className='flex justify-end my-20'>
          <div className='w-full sm:w-[450px]'>
            <CartAmount />
            <div className='w-full text-end'>
              <button onClick={()=> navigate("/place-order")} className='bg-black text-white text-sm my-8 px-8 py-3 cursor-pointer'>PROCEED TO CHECKOUT</button>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>): (
      <div className='flex items-center justify-center min-h-[60vh]'>
        <img className='w-1/2  max-w-sm opacity-80' src={assets.noCartItem}/>
      </div>
    )}
    </>
    
  )
}

export default Cart