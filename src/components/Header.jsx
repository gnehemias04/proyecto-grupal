import React from "react";
import { useState } from "react";

export default function Header({ searchPrincipal, setSearchPrincipal }) {
  console.log(searchPrincipal);
  return (
    <div>
      <header className="bg-[#83ba67] flex items-center justify-between px-4 py-3 fixed top-0 left-0 w-full z-50">
        <div className="flex items-center justify-center gap-2 md:gap-4">
          <img
            src="/images/Cheffcito-Photoroom.webp"
            alt="logo"
            className="h-8 md:h-10 object-contain mr-20"
          />

          <div className="absolute left-50 md:left-72 w-16 h-16 md:h-17 md:w-17 top-0 rounded-b-md bg-white flex items-center justify-center shadow-md">
            <img
              src="/images/Diseno_sin_titulo_3d.webp"
              alt="ratón"
              className="h-auto w-10 object-contain"
            />
          </div>
        </div>
        <div className="hidden md:flex md:border border-[#ffffff] items-center w-[37%] ml-5">
          <input
            className="w-full h-10 border-r border-[#ffffff] text-[#ffffff] text-sm px-2 placeholder:text-white focus:outline-none"
            type="text"
            placeholder="Busca una receta por nombre..."
            value={searchPrincipal}
            onChange={(e) => setSearchPrincipal(e.target.value)}
          />
          <div className="bg-[#83ba67] md:bg-lime-700 h-full">
            <svg
              className="w-6 h-6 text-white cursor-pointer m-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
        </div>
          <svg
            className="w-7 h-7 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </button>
      </header>
      <input
        type="checkbox"
        id="search-toggle"
        className="hidden peer md:hidden"
      />
      <div className="peer-checked:flex hidden md:hidden w-full bg-white px-4 py-2 fixed top-[56px] left-0 z-40 shadow-md">
        <input
          type="text"
          placeholder="Busca una receta por nombre, palabra clave..."
          className="w-full h-10 bg-transparent text-black text-sm px-2 placeholder:text-gray-500 focus:outline-none focus:ring-0"
          value={searchPrincipal}
          onChange={(e) => setSearchPrincipal(e.target.value)}
        />
      </div>
    </div>
  );
}
