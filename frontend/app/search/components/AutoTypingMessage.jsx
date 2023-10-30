import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion"; 

const AutoTypingMessage = ({ condition,message }) => {
  const [typedMessage, setTypedMessage] = useState('');

  useEffect(() => {
    let currentCharacter = 0;
    const messageLength = message.length;

    const typingInterval = setInterval(() => {
      if (currentCharacter < messageLength) {
        setTypedMessage(message.slice(0, currentCharacter + 1));
        currentCharacter++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100); 

    return () => {
      clearInterval(typingInterval);
    };
  }, [message]);

  return (
    <div className={`${condition}`}>
      {typedMessage}
    </div>
  );
};

export default AutoTypingMessage;