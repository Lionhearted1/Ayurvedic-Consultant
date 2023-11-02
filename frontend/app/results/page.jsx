"use client"
import React from "react";
import SearchResults from "./components/SearchResults"; 
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";


const Page = () => {
  const resItems = localStorage.getItem('resItems')
  const medicines=JSON.parse(resItems)

  return (
    
    <div className="wrap">
      <Link href={"/search"}>
      <button className="absolute top-1 left-1 text-3xl p-3 bg-transparent rounded-lg  "><IoMdArrowBack className="mr-2 text-gray-300 hover:text-white" /></button>
      </Link>
      
      <div className="back p-10 sm:p-14 ">
        
         <div className="overflow-y-auto" >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
           {medicines.map((medicine) => (
              <SearchResults key={medicine.id} medicine={medicine} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
