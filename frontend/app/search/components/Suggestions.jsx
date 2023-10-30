import React from "react";
import SearchResult from "./SearchResult";

const Suggestions = (props) => {
  const suggestions = props.suggestions;
  const selectedSuggestionIndex = props.selectedSuggestionIndex;

  return (
    <>
      <div
        className={`suggestions absolute top-[8.5rem] md:top-[7.5rem] h-auto md:h-auto max-h-[10rem] md:max-h-[12rem] w-3/4 bg-black bg-opacity-60 text-white rounded-2xl overflow-hidden overflow-y-auto`}
        ref={props.suggestionsRef}

      >
        {props.error && (
          <SearchResult className="error-message" value={props.error} />
        )}

        {suggestions.map((suggestion, index) => (
          <SearchResult
            key={index}
            condition={` ${
              index === selectedSuggestionIndex ? "bg-gray-200" : ""
            }`}
            onClick={() => props.handleSuggestionClick(suggestion)}
            onMouseEnter={() => props.setSelectedSuggestionIndex(index)}
            role="option"
            ariaSelected={index === selectedSuggestionIndex}
            tabIndex={0}
            value={suggestion}
          />
        ))}
      </div>
    </>
  );
};

export default Suggestions;
