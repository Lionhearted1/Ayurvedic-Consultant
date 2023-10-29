"use client";
import React, { useEffect, useState } from "react";
import Searchbar from "./components/Searchbar";
import Checkbox from "./components/Checkbox";
import { motion } from "framer-motion";
import ConfirmBtn from "./components/ConfirmBtn";

const Page = () => {
  //for visbilty of checkbox and confirm button
  const [isInputFocused, setInputFocused] = useState(false);
  const [isPrecAvailable, setPrecAvailable] = useState(false);

  //for visibility
  const handleFocus = (focus) => {
    setInputFocused(focus);
  };

  //animation variables
  const searchAni = `${isInputFocused || isPrecAvailable ? "slide-up" : ""}`;
  const precAvail = `${isInputFocused || isPrecAvailable ? "" : "hidden"}`;
  const autoCmplt = `${isInputFocused ? "" : "hidden"}`;
  const autoType = `${isInputFocused || isPrecAvailable ? "hidden" : ""}`;

  //for search-bar
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  return (
    <>
      <div className="wrap">
        <div className="back">
          <Searchbar
            condition={searchAni}
            autoTypeCondition={autoType}
            autoComplete={autoCmplt}
            onInputFocus={handleFocus}
            onSearchChange={handleSearchChange}
          />

          <Checkbox condition={precAvail} />
        


          <ConfirmBtn condition={precAvail} />
        </div>
      </div>
    </>
  );
};

export default Page;
