import React from "react";

const SearchResult = (props) => {
  

  return (
    <>
      <div
        className={`w-full h-[2.5rem] max-h-[4rem] p-4 bg-opacity-60 flex items-center hover:bg-white hover:bg-opacity-25 hover:shadow-lg hover:shadow-white/10 ${props.condition}`}
        onClick={props.onClick}
        onMouseEnter={props.onMouseEnter}
        role={props.role}
        aria-selected={props.ariaSelected}
        tabIndex={props.tabIndex}
      >
        {props.value}
      </div>
      <div className="w-full bg-white h-[0.05rem] bg-opacity-20"></div>
    </>
  );
};

export default SearchResult;
