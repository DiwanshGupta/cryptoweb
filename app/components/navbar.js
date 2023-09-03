"use client";
import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import { AiFillHome } from "react-icons/ai";
import { BsCurrencyExchange } from "react-icons/bs";
import { FaExchangeAlt, FaRegNewspaper } from "react-icons/fa";
import Link from "next/link";
const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div classname="w-full fixed">
        <div className="p-2  bg-gradient-to-b md:ml-64 from-cyan-950  flex to-gray-600">
          <button
            aria-controls="cta-button-sidebar"
            type="button"
            onClick={toggleSidebar}
            className={`inline-flex  items-center  p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden ${
              isSidebarOpen ? "hidden" : "block "
            }`}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="text-4xl font-semibold  bg-gradient-to-r from-purple-400 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient mx-auto">
            Cryptoweb
          </div>
        </div>

        <aside
          id="cta-button-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen  transition-transform -translate-x-full md:translate-x-0  ${
            isSidebarOpen ? "translate-x-0 " : "block "
          } `}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 md:py-6 overflow-y-auto navbgauto ">
            <ul className="space-y-5 md:space-y-8 font-medium">
              <button
                aria-controls="cta-button-sidebar"
                type="button"
                onClick={toggleSidebar}
                className="inline-flex items-center  p-2 w-10 h-10 justify-center  text-gray-500 rounded-lg md:hidden"
              >
                <ImCross />
              </button>

              <li>
                <Link
                  href="/home"
                  className="flex items-center lbtn text-xl p-2 text-gray-900  dark:text-white group"
                >
                  <AiFillHome />
                  <span className="flex-1 ml-3  whitespace-nowrap">Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/cryptos"
                  className="flex items-center p-2 lbtn text-gray-900 text-xl  dark:text-white  group"
                >
                  <BsCurrencyExchange />
                  <span className="flex-1 ml-3 whitespace-nowrap">Cryptos</span>
                </Link>
              </li>

              <li className="overbtn">
                <Link
                  href="/news"
                  className="flex items-center overbtn p-2 lbtn text-gray-900 text-xl  dark:text-white  group"
                >
                  <FaRegNewspaper />
                  <span className="flex-1 ml-3 whitespace-nowrap">News</span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Navbar;
