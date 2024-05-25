import React from "react";

const Navbar = () => {
  return (
    <nav className="flex flex-row justify-center">
      <div className="flex flex-col  popins-title">
        <p className="p-0 m-0">RENT</p>
        <p className="p-0 -mt-4">HUB</p>
      </div>

      <div className="flex flex-row">
        <a href="/" className="p-2">
          Home
        </a>
        <a href="/about" className="p-2">
          About
        </a>
        <a href="/contact" className="p-2">
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
