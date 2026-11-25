import React, {useContext} from 'react'
import MainPageWrapper from '@/MainComponents/MainPageWrapper'
import { Head } from '@inertiajs/react'
import { MainPartContext } from '@/MainContext/MainContext'
import { MdDelete } from "react-icons/md";
import CompareNavigator from '@/MainComponents/CompareNavigator';
import parse from 'html-react-parser'

const ProductComparison = () => {
  const {comparisonProducts,removeFromComparison} = useContext(MainPartContext)
  const appUrl = import.meta.env.VITE_APP_URL
  return (
    <>
    <Head>
      <title>Kelina International | The Complete Tech Store</title>
      <meta name="description" content="Explore our extensive collection of top-quality products at amazing prices. Don't miss out on exclusive offers—shop today!"/>
    </Head>
    <MainPageWrapper>
        <div className='w-full min-h-screen p-4 lg:px-16'>
          <h1 className='text-2xl font-semibold mb-6 text-tertiary underline '>Product Comparison</h1>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {comparisonProducts.map((product) => (
              <div key={product.id} className='border rounded-lg p-4 flex flex-col bg-white relative'>
                {/* Product Image */}
                <button className='absolute top-2 right-2 tooltip tooltip-left' data-tip='Remove from comparison' onClick={() => removeFromComparison(product.id)}><MdDelete className='text-red-500 text-2xl'/></button>
                <div className='w-full aspect-square mb-4 flex justify-center items-center'>
                  <img 
                    src={`${appUrl}/${product.images[0]?.image_path}`}
                    alt={product.product_name}
                    className='w-64 h-64 object-cover rounded-lg'
                  />
                </div>

                {/* Product Details */}
                <div className='flex flex-col flex-grow'>
                  <h2 className='text-lg font-semibold mb-2'>{product.product_name}</h2>
                  
                  <div className='mb-2'>
                    <span className='text-xl font-bold text-blue-600'>
                      {product.selling_price ? `Rs. ${product.selling_price}` : 'Price not available'}
                    </span>
                  </div>

                  <p className='text-gray-600 text-sm mb-4 flex-grow'>
                    {product.description}
                  </p>

                  {product.specification && parse(product.specification)}

                  {/* Additional specifications can be added here */}
                  <div className='text-sm text-gray-500'>
                    <p>SKU: {product.sku}</p>
                    {product.product_brand && <p>Brand: {product.product_brand}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MainPageWrapper>
      <CompareNavigator/>
    </>
   
  )
}

export default ProductComparison