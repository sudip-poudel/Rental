// import React from 'react';

import { Link } from "react-router-dom";
import camera from "/images/camera.png";
import { Button } from "@/components/ui/button";
import {
  useGetItemById,
  useGetItemsRentedByUser,
} from "@/api/itemsQueriesAndMutation";
import { useSelector } from "react-redux";
import { IRentDetails, RootState } from "@/types/types";

const DashboardCard = ({ item }: { item: IRentDetails }) => {
  const { data: itemData, isLoading: idItemLoading } = useGetItemById(
    item.item
  );

  if (idItemLoading) {
    return (
      <div className="flex items-center justify-center w-full ">
        <img src="images/loaderBlack.svg" alt="Loading..." />
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <img
        src={itemData?.pictureUrl[0]}
        alt="Item"
        className="w-full h-52 object-cover rounded transform transition duration-1000 ease-in-out hover:scale-105 hover:object-contain"
      />
      <h3 className="mt-2 font-bold">{itemData?.title}</h3>
      <p>Status: {itemData?.itemStatus.toUpperCase()}</p>
      <div className="mt-2 flex justify-between">
        <Button className=" text-white px-2 py-1 rounded">Edit</Button>
        <Button className=" text-white px-2 py-1 rounded">Delete</Button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const userId = useSelector((state: RootState) => state.auth.userInfo.id);
  const { data: rentedItems, isLoading } = useGetItemsRentedByUser(
    userId as string
  );
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="container mx-auto p-4">
        <header className="mb-4">
          <h1 className="text-2xl font-bold">Welcome to Your Dashboard</h1>
          <div className="mt-2 flex justify-between">
            <div>
              <p>Total Items: 10</p>
              <p>Total Earnings: $500</p>
            </div>
            <Link to="/addproduct">
              <Button className=" text-white px-4 py-2 rounded">
                Add New Item
              </Button>{" "}
            </Link>
          </div>
        </header>
        //TODO handle item fetching
        <section className="mb-4">
          <h2 className="text-xl font-semibold">Items You Have Rented:</h2>
          <div className="grid grid-cols-3 gap-4 mt-2">
            {rentedItems?.map((item, i) => (
              <DashboardCard key={i} item={item} />
            ))}
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
    </>
  );
};

export default Dashboard;
