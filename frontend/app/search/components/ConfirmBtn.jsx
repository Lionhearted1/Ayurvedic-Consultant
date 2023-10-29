import React from "react";
import { motion } from "framer-motion";

const ConfirmBtn = (props) => {
  return (
    <>
      <motion.div
        className={`confirm h-1/4 ${props.condition}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5 }}
      >
        Confirm
      </motion.div>
    </>
  );
};

export default ConfirmBtn;
