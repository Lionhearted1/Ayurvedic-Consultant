import React from "react";
import Link from "next/link";
import AutoTypingMessage from "../search/components/AutoTypingMessage";


const Content = () => {
  return (
        <div className="absolute w-full h-full flex flex-col items-center content-between justify-center space-y-[3rem]" >
            {/* <h1 className=" text-[2rem] text-white md:text-[3rem]">Welcome</h1> */}
            <AutoTypingMessage
            message="Welcome..."
            condition={"text-[2rem] text-white md:text-[3rem]"}/>
            <p className=" text-white text-[1rem] md:text-[1.4rem] lg:text-[1.6rem] max-w-6xl">
                Our Ayurvedic page is a holistic wellness hub, dedicated to the
                ancient healing tradition of Ayurveda. Explore the timeless wisdom of
                Ayurvedic remedies, lifestyle tips, and natural therapies to harmonize
                your mind, body, and spirit. Discover personalized insights on
                nutrition, herbs, and self-care practices for a balanced and vibrant
                life. Join us on a journey of well-being rooted in the wisdom of
                Ayurveda.
            </p>
            <Link href="/login">
            <button className=" text-white text-[1rem] bg-green-800 bg-opacity-75 w-[auto] h-[auto]
            p-[0.5rem] rounded-lg  hover:bg-white hover:text-black md:text-[1.2rem] md:p-[1rem] lg:text-[1.4rem]">Get Started</button>
            </Link>
        </div>
  );
};

export default Content;
