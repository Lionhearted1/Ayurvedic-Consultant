import React, { useState } from "react";

const DropdownInput = (props) => {
  const [selectedItem, setSelectedItem] = useState(""); // State to track the selected item

  const handleSelectChange = (e) => {
    setSelectedItem(e.target.value); // Update the selected item when the dropdown value changes
    props.onChange(e); // Call the parent component's onChange function if provided
  };

  return (
    <>
      <div className="inptbox w-3/4">
        <label className="lbl text-white">
          {props.label}
        </label>
        <div className="inpt h-[2rem] w-full bg-white bg-opacity-25 text-white flex items-center justify-center rounded-md p-2 border-white">
          <select
            className="bg-transparent focus:border-none focus:outline-none w-full text-white"
            value={selectedItem}
            onChange={handleSelectChange}
          >

            <option value="" disabled selected>Select your Role...</option>
            <option value="item1">Practioner</option>
            <option value="item2">Student</option>
            <option value="item3">Other</option>

           
          </select>
        </div>
      </div>
    </>
  );
};

export default DropdownInput;
