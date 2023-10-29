import React from 'react'
import { motion } from "framer-motion";

const Checkbox = (props) => {
  return (
    <>
    <motion.div
            className={`checkBox h-2/4 ${props.condition}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }} 
          >
            Checkbox
          </motion.div>
    </>
  )
}

export default Checkbox
