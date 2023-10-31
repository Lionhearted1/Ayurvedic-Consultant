import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Box from "./Box";

const Checkbox = (props) => {

  const [items, setItems] = useState([]);
  const [reserror, setResError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [precQuery, setPrecQuery] = useState('');
  const controller = new AbortController();

  useEffect(() => {
    fetchData();
    return () => {
      // Cancel the Axios request when the component unmounts
      controller.abort("Component unmounted")
    };
  }, [props.searchTerm]);


  useEffect(() => {
    prepareQuery();
  }, [selectedItems]);

  const prepareQuery=()=>{
    setPrecQuery(selectedItems.join(','));
  }

  useEffect(()=>{
    props.handlePrecterm(precQuery);
  },[precQuery])


  const fetchData = async () => {
    let data;
    let response;
    try {
      response = await axios.get(`http://localhost:3002/medicines/precautions?indications=${props.searchTerm}`, {
        headers: {
          'Content-Type': 'application/json', 
        },
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        },
      });
  
      if (response.status === 200) {
        data = response.data;
        setItems(data);
        setResError(null);
      } else if (response.status === 404) {
        data = response.data;
        setResError(data.message);
        setItems([]);
      } else {
        data = response.data;
        setResError(data.message)
      }
    } catch (error) {
      console.error(error);
    }
  };
  


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
          {items &&

            items.map((item, index) => (
              <Box
              key={index}
              item={item}
              isSelected={selectedItems.includes(item)}
              onToggle={toggleItem}
              />
              ))}
            {reserror &&
            <div>{reserror}</div>
            }
            

        </div>
      </motion.div>
    </>
  );
};

export default Checkbox;
