import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex flex-row justify-between mx-6 items-center">
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
      <div className="flex flex-row gap-2">
        <Button className="w-24 text-md">
          <Link to={"/signin"}>Login</Link>
        </Button>
        <Button className="w-24 text-md">
          <Link to={"/signin"}>Signup</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
