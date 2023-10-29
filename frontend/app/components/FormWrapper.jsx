import React from "react";
import "../globals.css";

const FormWrapper = (props) => {
  return (
    <>
      <div className="wrapp -z-10">
        <div className="main_container w-full h-full flex flex-col items-center justify-center bg-white bg-opacity-25 rounded-2xl md:flex-row">
          <div className="left flex flex-col justify-center items-center w-full h-full space-y-[2rem] backdropBlur rounded-2xl md:w-1/2 md:rounded-r-none">
          <h1 className="text-white text-[1.75rem] font-semibold md:text-[2rem]">
            {props.heading}
          </h1>{props.children}</div>
          <div className="right md:w-1/2"></div>
        </div>
      </div>
    </>
  );
};

export default FormWrapper;
