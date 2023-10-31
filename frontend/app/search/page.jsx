"use client";
import React, { useEffect, useState } from "react";
import Searchbar from "./components/Searchbar";
import Checkbox from "./components/Checkbox";
import ConfirmBtn from "./components/ConfirmBtn";
import axios from "axios";
import AutoTypingMessage from "./components/AutoTypingMessage";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation'; 


const Page = () => {
  const userparams=useSearchParams();
  const name=userparams.get('name')
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
    let data;

    try {
      const response = await axios.get(`http://localhost:3002/medicines/filter${url}`
      ,{validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      }});
      if (response.status === 200) {
      data = response.data;
      toast.success(data, { autoClose: 2000 });
      console.log(data);
    } else {
      data = response.data;
      console.log(data.message)
      toast.error(data.message, { autoClose: 2000 });
    }
  }
    catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.", { autoClose: 2000 });
    }
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
       <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="wrap">
        <div className="back">
          {!(isInputFocused || isPrecAvailable ) &&
        <AutoTypingMessage
        message={`Hello ${name}`}
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
        {(searchTerm.length>0 && isPrecAvailable) &&
          <ConfirmBtn 
          onClick={conOnClickHandle}

          />
        }
        </div>
      </div>
    </>
  );
};

export default Page;
