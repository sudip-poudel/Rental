import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
const Dashboard = () => {
  return (
    <>
      <div className="container mx-auto p-4">
        <header className="mb-4">
          <h1 className="text-2xl font-bold">Welcome to Your Dashboard</h1>
          <div className="mt-2 flex justify-between">
            <div>
              <p>Here you can:</p>
              <p>Add new Items, view your rentals and Listings</p>
            </div>
            <Link to="/addproduct">
              <Button className=" text-white px-4 py-2 rounded">
                Add New Item
              </Button>
            </Link>
          </div>
        </header>
      </div>
    </>
  );
};

export default Dashboard;
