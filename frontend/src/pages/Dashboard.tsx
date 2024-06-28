// import React from 'react';

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import camera from "/images/camera.png";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <header className="mb-4">
          <h1 className="text-2xl font-bold">Welcome to Your Dashboard</h1>
          <div className="mt-2 flex justify-between">
            <div>
              <p>Total Items: 10</p>
              <p>Total Earnings: $500</p>
            </div>
            <Link to="/addproduct">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Add New Item
              </button>{" "}
            </Link>
          </div>
        </header>

        <section className="mb-4">
          <h2 className="text-xl font-semibold">Your Rental Items</h2>
          <div className="grid grid-cols-3 gap-4 mt-2">
            {/* Map through rental items */}
            <div className="bg-white p-4 rounded shadow">
              <img
                src={camera}
                alt="Item"
                className="w-full h-32 object-cover rounded transform transition duration-1000 ease-in-out hover:scale-105 hover:object-contain "
              />
              <h3 className="mt-2 font-bold">Item Title</h3>
              <p>Status: Available</p>
              <div className="mt-2 flex justify-between">
                <button className="bg-green-500 text-white px-2 py-1 rounded">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <img
                src="/images/item.jpg"
                alt="Item"
                className="w-full h-32 object-cover rounded"
              />
              <h3 className="mt-2 font-bold">Item Title</h3>
              <p>Status: Available</p>
              <div className="mt-2 flex justify-between">
                <button className="bg-green-500 text-white px-2 py-1 rounded">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold">Current Rentals</h2>
          <ul className="mt-2">
            {/* Map through current rentals */}
            <li className="bg-white p-4 rounded shadow mb-2">
              <p>Renter: John Doe</p>
              <p>Item: Camera</p>
              <p>Rental Period: 01/01/2023 - 01/07/2023</p>
            </li>
          </ul>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold">Earnings</h2>
          <div className="mt-2">
            {/* Insert chart or earnings details here */}
            <p>Total Earnings: $500</p>
          </div>
        </section>

        <section className="mb-4">
          <h2 className="text-xl font-semibold">Messages</h2>
          <ul className="mt-2">
            {/* Map through messages */}
            <li className="bg-white p-4 rounded shadow mb-2">
              <p>Message from: Jane Doe</p>
              <p>Content: I am interested in renting your camera.</p>
            </li>
          </ul>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;
