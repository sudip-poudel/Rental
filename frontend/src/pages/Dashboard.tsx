import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  useGetItemById,
  useGetItemsRentedByUser,
  useMarkItemAsReceived,
  useMarkItemAsReturnRequested,
} from "@/api/itemsQueriesAndMutation";
import { useSelector } from "react-redux";
import { IRentDetails, RootState } from "@/types/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Rating } from "@smastrom/react-rating";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

const DashboardRentedCard = ({ item }: { item: IRentDetails }) => {
  const { toast } = useToast();
  const { data: itemData, isLoading: idItemLoading } = useGetItemById(
    item.item
  );
  const { mutate: markItemAsReceived } = useMarkItemAsReceived();
  const { mutate: markItemAsReturnRequested } = useMarkItemAsReturnRequested();
  const [ratingValue, setRatingValue] = useState(0);

  if (idItemLoading) {
    return (
      <div className="flex items-center justify-center w-full ">
        <img src="images/loaderBlack.svg" alt="Loading..." />
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <Toaster />
      <img
        src={itemData?.pictureUrl[0]}
        alt="Item"
        className="w-full h-52 object-cover rounded transform transition duration-1000 ease-in-out hover:scale-105 hover:object-contain"
      />
      <h3 className="mt-2 font-bold">{itemData?.title}</h3>
      <p className="mt-1 text-gray-600">
        Rented from: {new Date(item?.rentStart).toDateString()}
      </p>
      <p className="mt-1 text-gray-600">
        Rented until: {new Date(item?.rentEnd).toDateString()}
      </p>
      <p className="mt-1 text-gray-600">Rate: Rs.{item.rate}</p>
      <p className="mt-1 text-gray-600">
        Initial Deposit: Rs.{item.initialDeposit}
      </p>
      <div className="mt-2 flex flex-row items-center gap-2 justify-around">
        <AlertDialog>
          <AlertDialogTrigger className="">
            <div className="text-center flex items-center justify-center">
              {item.status === "requested" && <Button> Mark Received</Button>}

              {item.status === "rented" && <Button>Request Return</Button>}
              {item.status === "returnrequested" && (
                <Button>Return Requested</Button>
              )}
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-[500px]">
            <AlertDialogHeader>
              <AlertDialogTitle>
                <div>
                  {item.status === "requested" && "Mark Item As Received"}
                  {item.status === "rented" &&
                    !(new Date(item.rentEnd) < new Date()) &&
                    "Cannot return item before due date"}
                  {item.status === "rented" &&
                    new Date(item.rentEnd) <= new Date() &&
                    "Request Return"}
                  {item.status === "returnrequested" &&
                    "Waiting for owner to accept return request"}
                </div>
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter className="">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <div>
                  {item.status === "requested" && (
                    <Button
                      type="button"
                      onClick={() =>
                        markItemAsReceived(item.id, {
                          onSuccess: () =>
                            toast({ title: "Item marked as received" }),
                        })
                      }
                    >
                      Continue
                    </Button>
                  )}
                  {item.status === "rented" &&
                    new Date(item.rentEnd) < new Date() && (
                      <Button
                        onClick={() => {
                          console.log("not able to return");
                        }}
                      >
                        Continue
                      </Button>
                    )}
                  {item.status === "rented" &&
                    new Date(item.rentEnd) >= new Date() && (
                      <Button
                        onClick={() => {
                          markItemAsReturnRequested(item.id, {
                            onSuccess: () =>
                              toast({ title: "Return requested Success" }),
                          });
                          console.log("marked as returnrequested");
                        }}
                      >
                        Continue
                      </Button>
                    )}
                  {item.status === "returnrequested" && (
                    <Button>Continue</Button>
                  )}
                </div>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {item.status === "rented" && (
          <div className="flex flex-col items-center">
            {/*  TODO handle the rating logic   */}
            <p>Rate Item:</p>
            <Rating
              value={ratingValue}
              className="w-40"
              onChange={setRatingValue}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const DashboardListings = () => {};

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

        <section className="mb-4">
          <h2 className="text-xl font-semibold">Items You Have Rented:</h2>
          <div className="grid grid-cols-3 gap-4 mt-2">
            {rentedItems?.map((item, i) => (
              <DashboardRentedCard key={i} item={item} />
            ))}
          </div>
        </section>
        <section className="mb-4">
          <h2 className="text-xl font-semibold">Current Rentals</h2>
          <DasboardListings />
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
