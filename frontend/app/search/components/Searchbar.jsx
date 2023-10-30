import React, { useRef,useEffect, useState } from "react";
import { motion } from "framer-motion";
import AutoTypingMessage from "./AutoTypingMessage";
import axios from "axios";
import Suggestions from "./Suggestions";

const Searchbar = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [searchValue,setSearchValue]=useState("");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [error, setError] = useState(null); 
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);


  const handleFocus = () => {
    setIsFocused(true);
    props.onInputFocus(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    props.onInputFocus(false);
  };

  const fetchDataFromSource = async (term) => {
    setLoading(true);
    setError(null); // Reset error state

    try {
      const response = await axios.get(`http://localhost:3002/medicines/autocomplete?query=${term}`);
      if (response.status === 200) {
        const data = response.data;
        
        setSuggestions(data);
      } else {
        setError("Failed to fetch suggestions. Please try again.");
        setSuggestions([]); // Clear suggestions
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setError("Failed to fetch suggestions. Please try again.");
      setSuggestions([]); // Clear suggestions
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setError(null);
    const terms = newQuery.split(",");
    const currentTerm = terms[terms.length - 1].trim();
    if (currentTerm) {
      fetchDataFromSource(currentTerm);
      setSelectedSuggestionIndex(-1);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const currentValue = query;
    const lastCommaIndex = currentValue.lastIndexOf(",");
    const newQuery =
      lastCommaIndex !== -1
        ? `${currentValue.substring(0, lastCommaIndex + 1)}${suggestion}`
        : suggestion;

    setQuery(`${newQuery},`);
    
    setSuggestions([]);
    inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
      setSuggestions([]);
    } else if (suggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const newIndex =
          selectedSuggestionIndex < suggestions.length - 1
            ? selectedSuggestionIndex + 1
            : 0;
        setSelectedSuggestionIndex(newIndex);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const newIndex =
          selectedSuggestionIndex > 0
            ? selectedSuggestionIndex - 1
            : suggestions.length - 1;
        setSelectedSuggestionIndex(newIndex);
      } else if (e.key === "Enter" || e.key === "Return") {
        if (selectedSuggestionIndex >= 0) {
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        }
      }
    }
  };



  const logOrReturnInputValue = () => {
    console.log(query); // Log the input value to the console
    // If you want to return the value, you can use `return query;`
  };

  const clearInput = () => {
    setQuery("");
    setSuggestions([]);
    setError(null);
    inputRef.current.focus();
  };

  useEffect(() => {
    // Ensure that the selected suggestion is always in the view
    if (suggestionsRef.current) {
      const suggestionElement = suggestionsRef.current.children[selectedSuggestionIndex];
      if (suggestionElement) {
        // Calculate the scroll position to make the selected suggestion visible
        const suggestionTop = suggestionElement.offsetTop;
        const suggestionHeight = suggestionElement.clientHeight;
        const containerHeight = suggestionsRef.current.clientHeight;
        const scrollTop = suggestionsRef.current.scrollTop;

        if (suggestionTop < scrollTop) {
          suggestionsRef.current.scrollTop = suggestionTop;
        } else if (suggestionTop + suggestionHeight > scrollTop + containerHeight) {
          suggestionsRef.current.scrollTop = suggestionTop + suggestionHeight - containerHeight;
        }
      }
    }
  }, [selectedSuggestionIndex]);

  return (
    <>
      <AutoTypingMessage
        message="Hello World"
        condition={`text-white text-[2.5rem] md:text-[3rem] font-semibold ${props.autoTypeCondition}`}
      />
      <motion.div
        className={`search h-1/4 w-full flex justify-center items-center relative ${props.condition}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.75 }}
      >
        <motion.div
          className="inpt h-[2.5rem] w-3/4 bg-black bg-opacity-60 text-white flex items-center justify-center rounded-2xl p-4 border-white min-[425px]:h-[3rem]"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.75 }}
        >
          <input
            type="text"
            className="bg-transparent focus:border-none focus:outline-none w-full text-white"
            placeholder="Search for Symptoms"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={query}
          ref={inputRef}
          />
          {query && (
          <button
            className="absolute top-1 right-2 text-gray-500 cursor-pointer"
            onClick={clearInput}
          >
            {/* Add your close button or icon here */}
            X
          </button>
        )}
        </motion.div>
        {loading && <p>Loading suggestions...</p>}
        <Suggestions 
        error={error}
        suggestions={suggestions}
        setSelectedSuggestionIndex={setSelectedSuggestionIndex}
        selectedSuggestionIndex={selectedSuggestionIndex}
        handleKeyDown={handleKeyDown}
        handleSuggestionClick={handleSuggestionClick}
        ref={suggestionsRef}
        />
      </motion.div>
    </>
  );
};

export default Searchbar;
