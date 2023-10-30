"use client";
import Link from "next/link";
import React from "react";
import Background from './components/Background.jsx';
import Content from './components/Content.jsx';


const page = () => {
  return (
    <div className='text-center'>
      <Background />
      <Content />
    </div>
  );
};

export default page;
