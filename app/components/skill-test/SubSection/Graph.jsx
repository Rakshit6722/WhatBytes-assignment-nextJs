"use client";

import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import Index from "../../common/Graph/Graph";

import linegraph from '../../../assets/linegraph.png'

const Graph = () => {
  const { percentile } = useSelector((state) => state.user);
  
  return (
    <div className="p-4 border border-gray-300 rounded-md">
      <p className="font-bold">Comparison Graph</p>
      <div className="flex w-full text-sm justify-between items-center">
        <div>
          <p>
            <span className="font-bold text-gray-700">
              You scored {percentile || 30}% percentile
            </span>{" "}
            which is lower than the <br /> average percentile 72% of all the
            engineers who took this assignment
          </p>
        </div>
        <div className="hidden sm:flex bg-gray-200 w-14 h-14 items-center justify-center rounded-full mb-10">
          <Image src={linegraph} alt="graph image" width={20} height={20} />
        </div>
      </div>
      <div>
        <Index />
      </div>
    </div>
  );
};

export default Graph;
