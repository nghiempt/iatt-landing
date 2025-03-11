"use client";

import { Upload } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ChooseOption } from "./dialog/choose-option";

export default function AppAlbumClient() {

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <ChooseOption isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="w-full h-screen flex flex-col">
        <header className="w-full bg-blue-500 text-white p-4 text-center">
          <h1 className="text-xl font-bold">Action</h1>
        </header>
        <main className="w-full flex-grow bg-gray-100 p-4 overflow-auto flex flex-col gap-4">
          <div className="w-full h-[200px] bg-gray-100 border border-gray-400 rounded-lg flex justify-center items-center">
            <Upload />
          </div>
          <div className="w-full h-[200px] bg-gray-100 border border-gray-400 rounded-lg flex justify-center items-center">
            <Upload />
          </div>
          <div className="w-full h-[200px] bg-gray-100 border border-gray-400 rounded-lg flex justify-center items-center">
            <Upload />
          </div>
        </main>
      </div>
    </div>
  );
}
