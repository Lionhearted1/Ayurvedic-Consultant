import React from 'react';
import { motion } from 'framer-motion';

const SearchResults = ({ medicine }) => {
  const scaleVariants = {
    hover: {
      scale: 1.05, // Scale up to 110% on hover
    },
    initial: {
      scale: 1, // Initial scale (100%)
    },
  };

  return (
    <motion.div
      key={medicine.id}
      className="bg-black hover:bg-gray-100 bg-opacity-70 text-white hover:text-black rounded-lg p-4 mx-2.5 shadow-md cursor-pointer w-[280px] h-[320px]"
      whileHover="hover" // Apply the "hover" variant on hover
      initial="initial" // Apply the "initial" variant on initial render
      variants={scaleVariants}
    >
      <h2 className="text-xl font-semibold mb-2">{medicine.medicine}</h2>
      <div className="hover:text-black font-light">
        <p>Reference: {medicine.reference}</p>
        <p>Indications: {medicine.indications.join(', ')}</p>
        <p>Dosage: {medicine.dosage}</p>
        <p>Precaution: {medicine.precaution}</p>
        <p>Category: {medicine.category}</p>
      </div>
    </motion.div>
  );
};

export default SearchResults;
