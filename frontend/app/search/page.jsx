"use client";
import React, { useEffect, useState } from "react";
import Searchbar from "./components/Searchbar";
import Checkbox from "./components/Checkbox";
import { motion } from "framer-motion";
import ConfirmBtn from "./components/ConfirmBtn";
import axios from "axios";


const Page = () => {
  //for visbilty of checkbox and confirm button
  const [isInputFocused, setInputFocused] = useState(false);
  const [isPrecAvailable, setPrecAvailable] = useState(true);

  //for visibility
  const handleFocus = (focus) => {
    setInputFocused(focus);
  };

  //animation variables
  const searchAni = `${isInputFocused || isPrecAvailable ? "slide-up" : ""}`;
  const precAvail = `${isInputFocused || isPrecAvailable ? "" : "hidden"}`;
  const autoType = `${isInputFocused || isPrecAvailable ? "hidden" : ""}`;

  //for search-bar
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  //for prec-items
  const [precTerm, setPrecTerm] = useState("");
  const handlePrecterm = (value) => {
    setPrecTerm(value);
  };

  //for confirm
  const [url,setURL]=useState("")

  useEffect(() => {
    prepareURL()
  }, [searchTerm, precTerm]);

  const prepareURL=()=>{
    setURL(`?indications=${encodeURIComponent(searchTerm)}&precautions=${encodeURIComponent(precTerm)}`)
  }

  const conOnClickHandle = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/medicines/filter${url}`);
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
    console.log(url)
  };

  
  return (
    <>
      <div className="wrap">
        <div className="back">
          <Searchbar
            condition={searchAni}
            autoTypeCondition={autoType}
            onInputFocus={handleFocus}
            onSearchChange={handleSearchChange}
          />

          <Checkbox 
          condition={precAvail} 
          handlePrecterm={handlePrecterm} 
          searchTerm={searchTerm}
          />

          <ConfirmBtn 
          condition={precAvail} 
          onClick={conOnClickHandle}
          />

        </div>
      </div>
    </>
  );
};

export default Page;
