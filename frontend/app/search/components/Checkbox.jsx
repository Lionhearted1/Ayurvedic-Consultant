import React from "react";
import { motion } from "framer-motion";
import Box from "./Box";

const Checkbox = (props) => {
  return (
    <>
      <motion.div
        className={`checkBox h-2/4 ${props.condition} justify-center items-center flex flex-col`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-[2.25rem] text-white font-light mb-8">Select Precuations/Side-Effects</h1>

        <div className="flex flex-wrap justify-center items-center w-3/4 overflow-hidden overflow-y-auto">
          <Box value="box"/>
        </div>
      </motion.div>
    </>
  );
};

export default Checkbox;
