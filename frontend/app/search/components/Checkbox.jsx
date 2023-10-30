import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Box from "./Box";

const Checkbox = (props) => {

  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    // Fetch data from an API using Axios
    axios
      .get("http://localhost:3002/medicines/precautions?indications=Nadivrana")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const toggleItem = (item) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item)) {
        // If the item is already selected, remove it
        return prevSelectedItems.filter((selectedItem) => selectedItem !== item);
      } else {
        // If the item is not selected, add it
        return [...prevSelectedItems, item];
      }
    });
  };



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
          {items.map((item, index) => (
        <Box
          key={index}
          item={item}
          isSelected={selectedItems.includes(item)}
          onToggle={toggleItem}
        />
      ))}

        </div>
      </motion.div>
    </>
  );
};

export default Checkbox;
