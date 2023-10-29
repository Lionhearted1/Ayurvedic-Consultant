import React, { useState } from "react";
import { motion } from "framer-motion"; // Import motion from Framer Motion

const Searchbar = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    props.onInputFocus(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    props.onInputFocus(false);
  };

  return (
    <>
      <motion.div
        className={`search h-1/4 w-full flex justify-center items-center ${props.condition}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.75 }}
      >
        <motion.div
          className="inpt h-[2.5rem] w-3/4 bg-black bg-opacity-25 text-white flex items-center justify-center rounded-2xl p-2 border-white min-[425px]:h-[3rem]"
          whileHover={{ scale: 1.05 }} 
          transition={{ duration: 0.75 }} 
        >
          <input
            type="text"
            className="bg-transparent focus:border-none focus:outline-none w-full text-white"
            placeholder="Search for Symptoms"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => props.onSearchChange(e.target.value)}
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default Searchbar;
