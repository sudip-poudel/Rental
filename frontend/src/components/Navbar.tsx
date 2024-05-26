import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav className="flex flex-row justify-between px-3 items-center">
        <Link to={"/"}>
          <div className="flex flex-col  popins-title">
            <p className="p-0 m-0">RENT</p>
            <p className="p-0 -mt-4">HUB</p>
          </div>
        </Link>

        <div className="hidden flex-row text-lg font-bold  md:flex">
          <Link to="/" className="p-2 hover:underline">
            Home
          </Link>
          <Link to="/about" className="p-2 hover:underline">
            About Us
          </Link>
          <Link to="/contact" className="p-2 hover:underline">
            Contact
          </Link>
          <Link to="/dashboard" className="p-2 hover:underline">
            Dashboard
          </Link>
        </div>

        <div className="flex flex-row gap-2  ">
          <Button className="w-18 md:w-24 md:text-md">
            <Link to={"/signin"}>Login</Link>
          </Button>
          <Button className="w-18 md:w-24 md:text-md">
            <Link to={"/signin"}>Signup</Link>
          </Button>
        </div>
        <div className="md:hidden">
          {isOpen ? (
            <X size={32} onClick={() => setIsOpen(!isOpen)} />
          ) : (
            <Menu size={32} onClick={() => setIsOpen(!isOpen)} />
          )}
        </div>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed w-full top-20 gap-2  md:hidden"
          >
            <div className="flex flex-col items-center justify-center mx-auto w-[97%]  bg-[#b2b2b2] bg-opacity-65">
              <Link to="/" className="p-2 hover:underline">
                Home
              </Link>
              <Link to="/about" className="p-2 hover:underline">
                About Us
              </Link>
              <Link to="/contact" className="p-2 hover:underline">
                Contact
              </Link>
              <Link to="/dashboard" className="p-2 hover:underline">
                Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
