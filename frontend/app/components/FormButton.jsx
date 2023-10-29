import React from "react";
import Link from "next/link";

const FormButton = (props) => {
    const onCLickHandler=(e)=>{
        e.preventDefault();
        props.onClick();
    }

  return (
    <>
      <button onClick={onCLickHandler}className="w-3/4 bg-white rounded-md h-[2rem] font-semibold hover:bg-black hover:text-white cursor-pointer">
      {props.buttonText}
      </button >
      <div className="register">
        <p className="text-white text-[0.85rem]">
          {props.registerText}
          <Link className="font-semibold cursor-pointer" href={props.href}>
            {props.linkText}
          </Link>
        </p>
      </div>
    </>
  );
};

export default FormButton;
