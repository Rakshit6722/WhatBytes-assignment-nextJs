import React from "react";
import { useSelector } from "react-redux";

const CircularProgress = () => {
    const { score } = useSelector(state => state.user); 
    const maxScore = 15; 
    const percentage = (score / maxScore) * 100; 
    const strokeDashArray = `${percentage}, 100`; 
  
    return (
      <div className="flex justify-center items-center mb-10"> {/* Add margin-bottom */}
        <div className="relative w-40 h-40"> 
          <svg className="transform rotate-[-90deg]" viewBox="0 0 36 36" width="100%" height="100%">
            <path
              className="text-gray-200"
              strokeWidth="3.8"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-blue-500"
              strokeWidth="3.8"
              stroke="currentColor"
              strokeDasharray={strokeDashArray}
              fill="none"
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex justify-center items-center text-5xl">
            🎯
          </div>
        </div>
      </div>
    );
  };

export default CircularProgress;
