import React from "react";
import Link from "next/link";
import AutoTypingMessage from "../search/components/AutoTypingMessage";


const Content = () => {
  return (
        <div className="absolute w-full h-full flex flex-col items-center content-between justify-center space-y-[1.5rem]
        sm:space-y-[3rem] px-4 md:px-8" >
            {/* <h1 className=" text-[2rem] text-white md:text-[3rem]">Welcome</h1> */}
            <AutoTypingMessage
            message="Welcome..."
            condition={"text-[2rem] text-white md:text-[3rem]"}/>
            <p className=" text-white text-[1rem] md:text-[1.4rem] lg:text-[1.6rem] max-w-6xl">
              Ayurvedic Consultant's main objective is to help empower aspiring Ayurvedic Practitioner's by providing 
              consultancy services in the form of our intuitive interface to help solve their queries. We provide a 
              comprehensive database of drug formulations along with their dosage and reference text as we understand 
              the importance of precise and authentic knowledge for ayurvedic practitioners. Our aim is to assist 
              students with our user-friendly approach on their learning journey so they may develop and use their 
              skills to help the public.
            </p>
            <Link href="/login">
            <button className=" text-white text-[1rem] bg-green-800 bg-opacity-75 w-[auto] h-[auto]
            p-[0.5rem] rounded-lg  hover:bg-white hover:text-black md:text-[1.2rem] md:p-[1rem] lg:text-[1.4rem]">Get Started</button>
            </Link>
        </div>
  );
};

export default Content;
