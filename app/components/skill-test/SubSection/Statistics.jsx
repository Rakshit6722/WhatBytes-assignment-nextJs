"use client";

import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

import trophy from '../../../assets/trophy.png'
import paperboard from '../../../assets/paperboard.png'
import square from '../../../assets/square.png'

const Statistics = () => {
  const { rank, percentile, score } = useSelector((state) => state.user);

  return (
    <div className="border border-gray-300 p-4 rounded-md">
      <p className="font-bold mb-4">Quick Statistics</p>
      <div className="flex flex-wrap lg:flex-nowrap justify-between gap-4">
        {/* rank section */}
        <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-start py-5 gap-3 sm:border-r sm:border-gray-300 lg:pr-1">
          <div className="bg-gray-200 rounded-full w-14 h-14 flex items-center justify-center">
            <Image src={trophy} alt="logo" width={35} height={35} />
          </div>
          <div className="text-center lg:text-left">
            <span className="font-bold lg:text-lg">{rank || 1}</span>
            <p className="text-gray-400 text-[11px] lg:text-md font-semibold">YOUR RANK</p>
          </div>
        </div>

        {/* percentile section */}
        <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-start py-5 gap-3 sm:border-r sm:border-gray-300 lg:px-1">
          <div className="bg-gray-200 rounded-full w-14 h-14 flex items-center justify-center">
            <Image src={paperboard} alt="logo" width={35} height={35} />
          </div>
          <div className="text-center lg:text-left">
            <span className="font-bold lg:text-lg">{percentile || 30}%</span>
            <p className="text-gray-400 text-[11px] lg:text-md font-semibold">PERCENTILE</p>
          </div>
        </div>

        {/* correct answers section */}
        <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-start py-5 gap-3 lg:pl-1">
          <div className="bg-gray-200 rounded-full w-14 h-14 flex items-center justify-center">
            <Image src={square} alt="logo" width={20} height={20} />
          </div>
          <div className="text-center lg:text-left">
            <span className="font-bold lg:text-lg">{score || 10}/15</span>
            <p className="text-gray-400 text-[11px] lg:text-md font-semibold">CORRECT ANSWERS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
