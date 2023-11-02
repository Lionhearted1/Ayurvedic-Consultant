"use client";
import React, { useEffect, useState } from "react";
import Searchbar from "./components/Searchbar";
import Checkbox from "./components/Checkbox";
import ConfirmBtn from "./components/ConfirmBtn";
import axios from "axios";
import AutoTypingMessage from "./components/AutoTypingMessage";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RedirectComponent from "../components/RedirectComponent";
import { useRouter } from "next/navigation";



const Page = () => {

  const router = useRouter();

  //for name
  const name=localStorage.getItem('username')

 //for search-bar
  const [searchTerm, setSearchTerm] = useState(()=>{
    const searchQuery=localStorage.getItem('query')
    return searchQuery? searchQuery : "";
  });

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
    const sanitizedSearchTerm=searchTerm.replace(/,+$/, '');
    const sanitizedPrecTerm=precTerm.replace(/,+$/, '')
    setURL(`?indications=${encodeURIComponent(sanitizedSearchTerm)}&precautions=${encodeURIComponent(sanitizedPrecTerm)}`)
  }


  //submit
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
      localStorage.setItem('resItems',JSON.stringify(data))
      router.push('/results')
    } else {
      data = response.data;
      toast.error(data.message, { autoClose: 2000 });
    }
  }
    catch (error) {
      toast.error("Error:", error);
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

  //conditional render
  const isLogged=localStorage.getItem('isLogged')
  if(isLogged=="false"){
    return (<>
    <RedirectComponent/>
    </>)
  }

  else{
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
        {(isPrecAvailable) &&
          <ConfirmBtn 
          onClick={conOnClickHandle}

          />
        }
        </div>
      </div>
    </>
  );
};
}

export default Page;
