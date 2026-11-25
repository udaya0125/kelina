import { useContext } from "react";
import React from 'react'
import { FaCodeCompare } from "react-icons/fa6";
import { MainPartContext } from "../MainContext/MainContext";
import {router} from '@inertiajs/react'

const CompareNavigator = () => {
  const {comparisonProducts} = useContext(MainPartContext)

  const appUrl = import.meta.env.VITE_APP_URL


    if(comparisonProducts.length === 0){
        return null;
    }

  return (
    <div onClick={()=>router.get('/productcomparison')} className="fixed lg:bottom-5 bottom-16 left-[20px] bg-blue-500 text-white p-3 rounded-full cursor-pointer hover:bg-blue-600 group z-[210]">
    <FaCodeCompare size={24} />
    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
      {comparisonProducts.length}
    </span>
    {/* <div className="absolute bottom-full mb-2 left-0 ml-[-180px] bg-white p-3 text-black w-[300px] rounded-md border-tertiary border hidden group-hover:block max-h-[300px] overflow-y-auto"> */}
    <div className="absolute bottom-full mb-3 left-0 sm:left-0 sm:right-auto right-0 
bg-white p-3 text-black w-[280px] max-w-[90vw] 
rounded-md border border-gray-200 shadow-lg 
hidden group-hover:block max-h-[300px] overflow-y-auto z-[210]">
        {comparisonProducts.map((item, index) =>
            <div key={index} className="flex items-center gap-2 mb-2">
                <img src={`${appUrl}/${item.images[0].image_path}`} alt={item.product_name} className="w-16 h-16 object-contain"/>
                <p className="text-sm">{item.product_name}</p>
            </div>
        )}
    </div>
  </div>
  )
}

export default CompareNavigator