"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Changed from "motion/react" to "framer-motion" as it is more common and aligns with the typical structure of this component.

let interval;

export const CardStack = ({
  items,
  offset,
  scaleFactor
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  
  // FIX: Initialize state with 'items' or an empty array '[]' if 'items' is undefined/null
  const [cards, setCards] = useState(items ?? []); 

  useEffect(() => {
    // Only start flipping if there are items
    if (cards.length > 0) {
      startFlipping();
    }

    // Cleanup function to clear the interval
    return () => clearInterval(interval);
  }, [cards.length]); // Re-run effect if card length changes

  const startFlipping = () => {
    // Clear any existing interval before starting a new one
    clearInterval(interval); 
    
    interval = setInterval(() => {
      setCards((prevCards) => {
        if (prevCards.length === 0) return prevCards; // Safety check
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()); // move the last element to the front
        return newArray;
      });
    }, 5000);
  };

  return (
    <div className="relative h-60 w-60 md:h-60 md:w-96">
      {/* Ensure cards array is not empty before mapping */}
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute bg-white h-60 w-60 md:h-60 md:w-96 rounded-3xl p-4 shadow-xl border border-black shadow-black/[0.1] flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
            }}
            initial={{ 
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, // decrease z-index for the cards that are behind
            }}>
            <div className="font-normal text-black ">
              {card.content}
            </div>
            <div>
              <p className="text-black font-medium dark:text-black">
                {card.name}
              </p>
              <p className="text-black font-normal dark:text-black">
                {card.designation}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};