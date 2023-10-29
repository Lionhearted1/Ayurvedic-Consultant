"use client"
import React, { useEffect, useState } from 'react';
import Searchbar from './components/Searchbar';
import Checkbox from './components/Checkbox';
import Confirm from './components/Confirm';
import { motion } from 'framer-motion'; 

const Page = () => {
  const [isInputFocused, setInputFocused] = useState(false);

  const handleFocus = (focus) => {
    setInputFocused(focus);
  };

  const isCheckboxVisible = isInputFocused;
  const isConfirmVisible = isInputFocused;

  return (
    <>
      <div className='wrap'>
        <div className="back">
          <motion.div
            className={`search h-1/4 w-full flex justify-center items-center ${
              isCheckboxVisible || isConfirmVisible ? 'slide-up' : ''
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }} 
          >
            <Searchbar onInputFocus={handleFocus}/>
          </motion.div>
          <motion.div
            className={`checkBox h-2/4 ${isInputFocused ? '' : 'hidden'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }} 
          >
            <Checkbox />
          </motion.div>
          <motion.div
            className={`confirm h-1/4 ${isInputFocused ? '' : 'hidden'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }} 
          >
            <Confirm />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Page;
