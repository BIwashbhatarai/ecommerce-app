import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../contexts/ShopContext'
import ProductItems from './ProductItems'
import Title from "./Title"

const RelatedProduct = ({ category, subCategory }) => {
  const [relatedProduct, setRelatedProduct] = useState([])
  const { products } = useContext(ShopContext)

  useEffect(() => {
    let productCp = [...products]

    productCp = productCp.filter((item) => item.category === category)
    productCp = productCp.filter((item) => item.subCategory === subCategory)

    setRelatedProduct(productCp.slice(0,5))
  }, [products, category, subCategory])

  return (
    <div className='my-24'>
        <div className='text-center py-2 text-3xl'>
            <Title text1={"RELATED"} text2={"PRODUCTS"}/>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {relatedProduct.map((item, index) => (
        <ProductItems
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
        />
        ))}
        </div>
    </div>
  )
}

export default RelatedProduct
