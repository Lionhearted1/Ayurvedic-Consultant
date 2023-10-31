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
  const [mounted, setMounted] = useState(false);
  const [prevSearchTerm, setPrevSearchTerm] = useState(null);


  useEffect(() => {
    setMounted(true);
    // Check if the component is mounted and if the search term has changed
    if (mounted && props.searchTerm !== prevSearchTerm) {
      fetchData();
    }
    else if(!props.searchTerm){
      setItems([])
    }
  
    // Update the previous search term
    setPrevSearchTerm(props.searchTerm);
  
    // Cancel the Axios request when the component unmounts
    return () => {
      setMounted(false);
      controller.abort("Component unmounted")
    };
  }, [props.searchTerm, prevSearchTerm]);
  

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
        props.handlePrec(true)
        setResError(null);
      } else if (response.status === 404) {
        data = response.data;
        props.handlePrec(true)
        setResError(data.message);
        setItems([]);
      } else {
        props.handlePrec(false)
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
        className={`checkBox h-2/4 justify-center items-center flex flex-col`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5 }}
      >


       
{items.length>0 &&

        <h1 className="text-white text-[1.2rem] md:text-[2rem] font-semibold"
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        transition={{ duration: 0.5 }}
        
        >Select Precuations/Side-Effects
        </h1>
}
        <div className="flex flex-wrap justify-center items-center w-3/4 overflow-hidden overflow-y-auto">

        {items.length>0 &&
            items.map((item, index) => (
              <Box
              key={index}
              item={item}
              isSelected={selectedItems.includes(item)}
              onToggle={toggleItem}
              />
              ))}
              </div>  
            {reserror && <div className="w-full text-center text-white text-[1.1rem] md:text-[1.5rem] font-semibold"> {reserror} </div>}    

      </motion.div>
    </>
  );
};

export default Checkbox;
