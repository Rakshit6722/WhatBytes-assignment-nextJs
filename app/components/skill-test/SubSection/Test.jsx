"use client";

import React, { useState } from "react";
import Image from "next/image";
import UpdationModal from "../../common/UpdationModal";

import HTMLLogo from '../../../assets/HTML_logo.png'

const Test = () => {
  const [update, setUpdate] = useState(false);
  const handleClose = () => {
    setUpdate(false);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row font-custom justify-between gap-y-3 gap-x-4 sm:items-center border border-gray-300 rounded-md px-3 py-5">
        <Image
          src={HTMLLogo} // Use relative path from the public directory
          alt="html5"
          width={70}
          height={70}
        />
        <div>
          <h2 className="font-bold">Hyper Text Markup Language</h2>
          <p className="text-gray-500 text-[.9rem] font-semibold">
            Questions: 08 | Duration: 15 mins | Submitted on 5 June 2021
          </p>
        </div>
        <button
          onClick={() => setUpdate((prev) => !prev)}
          className="bg-blue-900 hover:bg-blue-700 px-8 py-2 text-white rounded-md"
        >
          Update
        </button>
      </div>
      {update && <UpdationModal logo="/assets/HTML_logo.png" handleClose={handleClose} />}
    </>
  );
};

export default Test;
