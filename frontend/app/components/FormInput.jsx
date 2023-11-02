import React from "react";

const FormInput = (props) => {

    const onChangeHandler=(e)=>{

        props.onChange(e);
    }

  return (
    <>
      <div className="inptbox w-3/4">
        <label className="lbl text-white">
          {props.label}
        </label>
        <div className="inpt h-[2rem] w-full bg-white bg-opacity-25 text-black flex items-center justify-center rounded-md p-2 border-white">
          <input
            name={props.name}
            type={props.type}
            required
            className="bg-transparent focus:border-none focus:outline-none w-full"
            value={props.value}
            onChange={onChangeHandler}
          />
        </div>
      </div>
    </>
  );
};

export default FormInput;
