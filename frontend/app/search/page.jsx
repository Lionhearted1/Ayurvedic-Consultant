"use client";
import React, { useEffect, useState } from "react";
import Searchbar from "./components/Searchbar";
import Checkbox from "./components/Checkbox";
import { motion } from "framer-motion";
import ConfirmBtn from "./components/ConfirmBtn";
import axios from "axios";
import AutoTypingMessage from "./components/AutoTypingMessage";


const Page = () => {
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

  const [isClicked,setIsCLicked]=useState(false)

  const forAutoOnclick=(value)=>{
    setIsCLicked(value)
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

  //for visbilty of checkbox and confirm button
  const [isInputFocused, setInputFocused] = useState(false);
  const [isPrecAvailable, setPrecAvailable] = useState(false);


  //for visibility
  const handleFocus = (focus) => {
    setInputFocused(focus);
  };

  const handlePrec=(prec)=>{
    setPrecAvailable(prec)
  }

  
  return (
    <>
      <div className="wrap">
        <div className="back">
          {!(isInputFocused || isPrecAvailable || isClicked) &&
        <AutoTypingMessage
        message="Hello World"
        condition={`text-white text-[2.5rem] md:text-[3rem] font-semibold`}
      />}

          <Searchbar
            onInputFocus={handleFocus}
            onSearchChange={handleSearchChange}
          />
        {(isInputFocused || isPrecAvailable) &&
          <Checkbox 
          handlePrecterm={handlePrecterm} 
          searchTerm={searchTerm}
          handlePrec={handlePrec}
          />
        }
        {(isInputFocused || isPrecAvailable) &&
          <ConfirmBtn 
          onClick={conOnClickHandle}
          forAutoOnclick={forAutoOnclick}
          />
        }
        </div>
      </div>
    </>
  );
};

export default Page;
