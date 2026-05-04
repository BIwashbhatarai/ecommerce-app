import React, { useContext, useState , useEffect} from 'react'
import { ShopContext } from '../contexts/ShopContext'
import Title from './Title'
import ProductItems from './ProductItems'


const LatestCollections = () => {
    const {products} = useContext(ShopContext)
    const [latestProduct, setLatestProduct] = useState([]);

    useEffect(() => {
      if (products.length > 0) {
        setLatestProduct(products.slice(0, 10));
      }
    }, [products])

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={"LATEST"} text2={"COLLECTIONS"}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.</p>
      </div>

      {/* Rendering Products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-0'>
        {latestProduct.map((item, index) => (
          <ProductItems key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
        ))}
      </div>
    </div>
  )
}

export default LatestCollections