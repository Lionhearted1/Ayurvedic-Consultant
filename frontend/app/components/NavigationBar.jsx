import React, { useState } from "react";
import { FiMenu } from 'react-icons/fi';
import Link from "next/link";


const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const isLogged = localStorage.getItem("isLogged");



  return (
    <div className={`bg-transparent text-black p-4 fixed top-0 right-0 
                    ${isOpen ? "w-full sm:w-full md:w-1/4 lg:w-1/6" : "w-12"} 
                    transition-all duration-300 z-10  `}>
      <div className="flex items-center justify-end">
        <div className="text-2xl cursor-pointer" onClick={toggleNavbar}>
        <FiMenu className="-mr-1 h-8 w-8 text-white" />
        </div>
      </div>
      <div className="bg-white  bg-opacity-25 backdropBlur rounded-md">
      <div className={`flex flex-col mt-4 ${isOpen ? "flex" : "hidden"}`}>
        <Link href="/" className="text-white text-center py-2 hover:text-black hover:bg-gray-300 active:bg-green-500">Home</Link>
        <Link href="./login" className="text-white text-center py-2 hover:text-black hover:bg-gray-300 active:bg-green-500">Login</Link>
        <Link href="./search" className="text-white text-center py-2 hover:text-black hover:bg-gray-300 active:bg-green-500">Search</Link>
        {isLogged=="true" && <Link href="/logout" className="text-white text-center py-2 hover:text-black hover:bg-gray-300 active:bg-green-500">Logout</Link>}
      </div>
      </div>
    </div>
  );
};

export default NavigationBar;
