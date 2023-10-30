import React from 'react'
import { motion } from "framer-motion";


const Box = ({ item, isSelected, onToggle }) => {
  return (
    <>
    <motion.div className={`flex flex-wrap whitespace-normal items-center justify-center max-w-[15rem] md:max-w-[20rem] w-auto h-auto text-[1rem] bg-black bg-opacity-90 text-white px-4 py-2 rounded-3xl m-4 hover:bg-white hover:text-black hover:font-semibold cursor-pointer 
    ${isSelected ? "bg-white text-black font-semibold" : ""}`} 

    onClick={() => onToggle(item)}
    whileHover={{ scale: 1.05 }} // Scale up on hover
    animate={{ scale: isSelected ? 1.05 : 1 }}
    
    >
        {item}
    </motion.div>
    </>
  )
}

export default Box
