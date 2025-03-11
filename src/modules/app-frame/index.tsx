"use client";

import { Upload } from "lucide-react";
import React from "react";

export default function AppFrameClient() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full h-screen flex flex-col">
        <header className="w-full bg-blue-500 text-white p-4 text-center">
          <h1 className="text-xl font-bold">Action</h1>
        </header>
        <main className="w-full flex-grow bg-gray-100 p-4 overflow-auto">
          <div className="w-full h-[500px] bg-gray-100 border border-gray-400 rounded-lg flex justify-center items-center">
            <Upload />
          </div>
        </main>
        <footer className="w-full bg-gray-800 text-white p-4 text-center">
          <h1 className="text-xl font-bold">Bottom Bar</h1>
        </footer>
      </div>
    </div>
  );
}
