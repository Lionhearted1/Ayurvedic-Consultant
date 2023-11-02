"use client";
import Link from "next/link";
import React from "react";
import Background from './components/Background.jsx';
import Content from './components/Content.jsx';
import DropdownMenu from './components/DropdownMenu.jsx';


const page = () => {
  return (
    <div className='text-center'>
      <Background />
      <Content />
      <div className="absolute top-0 right-0 mt-4 mr-4">
      </div>
    </div>
  );
};

export default page;
