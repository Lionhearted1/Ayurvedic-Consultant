"use client"
import React from "react";
import SearchResults from "./components/SearchResults"; 
import { IoMdArrowBack } from "react-icons/io";

const Page = () => {
  const medicines = [{
    "id": 1,
    "medicine": "Abhayarishta",
    "reference": "AFI",
    "pack-Size": "200 ml",
    "indications": ["Arsha", "Agnimandya", "Udararoga", "Vibandha"],
    "dosage": "12-24\nml",
    "precaution": "NS",
    "opd_ip": "Both",
    "category": "Asava Arista"
    },
    {
    "id": 2,
    "medicine": "Amritarishta",
    "reference": "AFI",
    "pack-Size": "200 ml",
    "indications": ["SarvaJvara", "Jirna Jvara"],
    "dosage": "12-24\nml",
    "precaution": "NS",
    "opd_ip": "Both",
    "category": "Asava Arista"
    },
    {
    "id": 3,
    "medicine": "Aragvadharishta",
    "reference": "AH",
    "pack-Size": "200 ml",
    "indications": ["Kandu", "Tvak Vikara", "Vibandha"],
    "dosage": "12-24\nml",
    "precaution": "NS",
    "opd_ip": "Both",
    "category": ""
    },
    {
      "id": 4,
      "medicine": "Aragvadharishta",
      "reference": "AH",
      "pack-Size": "200 ml",
      "indications": ["Kandu", "Tvak Vikara", "Vibandha"],
      "dosage": "12-24\nml",
      "precaution": "NS",
      "opd_ip": "Both",
      "category": ""
      },
      {
        "id": 5,
        "medicine": "Aragvadharishta",
        "reference": "AH",
        "pack-Size": "200 ml",
        "indications": ["Kandu", "Tvak Vikara", "Vibandha"],
        "dosage": "12-24\nml",
        "precaution": "NS",
        "opd_ip": "Both",
        "category": ""
        },
        {
          "id": 6,
          "medicine": "Aragvadharishta",
          "reference": "AH",
          "pack-Size": "200 ml",
          "indications": ["Kandu", "Tvak Vikara", "Vibandha"],
          "dosage": "12-24\nml",
          "precaution": "NS",
          "opd_ip": "Both",
          "category": ""
          },
          {
            "id": 7,
            "medicine": "Aragvadharishta",
            "reference": "AH",
            "pack-Size": "200 ml",
            "indications": ["Kandu", "Tvak Vikara", "Vibandha"],
            "dosage": "12-24\nml",
            "precaution": "NS",
            "opd_ip": "Both",
            "category": ""
            }
  ];

  return (
    
    <div className="h-screen w-screen bg-black bg-opacity-5 px-[2rem] py-[1rem] md:px-[4rem] md:py-[3rem] lg:px-[4rem] lg:py-[4rem]">
      <button className="absolute top-3 left-3 text-3xl p-3 bg-transparent rounded-lg  "><IoMdArrowBack className="mr-2 text-gray-300 hover:text-white" /></button>
        <div className="main_container  w-full h-full flex flex-col items-center justify-center bg-white bg-opacity-25 rounded-2xl md:flex-row overflow-y-auto">
         <div className="container mx-auto my-8 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
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
