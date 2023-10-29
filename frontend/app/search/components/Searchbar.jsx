import React, { useState } from "react";
import { motion } from "framer-motion"; // Import motion from Framer Motion

const Searchbar = ({ onInputFocus }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onInputFocus(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    onInputFocus(false);
  };

  return (
    <>
      <motion.div
        className="inpt h-[2.5rem] w-3/4 bg-black bg-opacity-25 text-white flex items-center justify-center rounded-2xl p-2 border-white min-[425px]:h-[3rem]"
        whileHover={{ scale: 1.05 }} // Adjust the scale factor for a smoother effect
        transition={{ duration: 0.4 }} // Adjust the transition duration for a smoother animation
      >
        <input
          type="text"
          className="bg-transparent focus:border-none focus:outline-none w-full text-white"
          placeholder="Search for Symptoms"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </motion.div>
    </>
  );
};

export default Searchbar;
