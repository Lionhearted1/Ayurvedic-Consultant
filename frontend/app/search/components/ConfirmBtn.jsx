import React from "react";
import { motion } from "framer-motion";

const ConfirmBtn = (props) => {
  

  return (
    <>
      <motion.div
        className={`confirm h-1/4 flex justify-center items-center`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5 }}
      >
        <button
          className=" text-white bg-green-800 bg-opacity-75 w-[auto] h-[auto]
         rounded-lg text-[1.1rem]  hover:bg-white hover:text-black hover:font-semibold px-[1rem] py-[0.5rem] lg:text-[1.2rem]"
        onClick={props.onClick}

        >
          Confirm
        </button>
      </motion.div>
    </>
  );
};

export default ConfirmBtn;
