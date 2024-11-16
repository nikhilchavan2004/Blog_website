import { useState } from 'react';
import { Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import {  AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navbar className="border-b-2 flex justify-between items-center p-4">
      <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
        <span className="px-2 py-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-xl text-white">
          N
        </span>
        <span className="ml-1">blog</span>
      </Link>

      <form className="flex items-center">
        <TextInput
          type="text"
          placeholder="Search..."
        
          className="hidden lg:inline pl-24"
        />
        <CiSearch  className='hidden lg:inline relative  -left-5' />

        
      </form>
      <div className={`${isOpen ? 'flex' : 'hidden'} flex-col items-end space-y-4 lg:hidden`}>
        <Link to="/home" className="text-sm sm:text-lg text-gray-700 hover:text-purple-600">
          Home
        </Link>
        <Link to="/about" className="text-sm sm:text-lg text-gray-700 hover:text-purple-600">
          About
        </Link>
        <Link to="/projects" className="text-sm sm:text-lg text-gray-700 hover:text-purple-600">
          Projects
        </Link>
      </div>

      <button
        className="lg:hidden"
        onClick={toggleNavbar}
      >
        {isOpen ? (
          <AiOutlineClose className="w-6 h-6" />
        ) : (
          <AiOutlineMenu className="w-6 h-6" />
        )}
      </button>

      <div className="flex gap-2 md:order-2">
        <button className="w-12 h-10 hidden sm:inline bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-xl px-4 relative top-0.4">
          <FaMoon />
        </button>
        <button className="w-15 h-10 bg-gray-400 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-2xl px-4">
          Sign-in
        </button>
      </div>

      {/* Mobile Menu */}
      
      {/* Toggle Button for Mobile View */}
     

      {/* Desktop Links */}
      <div className="hidden lg:flex space-x-10 relative top-1 left-16">
        <Link to="/home" className={`text-sm sm:text-lg text-gray-700 hover:text-purple-600 ${path === "/home" ? 'font-bold' : ''}`}>
          Home
        </Link>
        <Link to="/about" className={`text-sm sm:text-lg text-gray-700 hover:text-purple-600 ${path === "/about" ? 'font-bold' : ''}`}>
          About
        </Link>
        <Link to="/projects" className={`text-sm sm:text-lg text-gray-700 hover:text-purple-600 ${path === "/projects" ? 'font-bold' : ''}`}>
          Projects
        </Link>
      </div>
    </Navbar>
  );
}