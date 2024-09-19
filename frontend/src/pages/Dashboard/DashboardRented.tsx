import { Button } from "@/components/ui/button";
import {
  useChangeRentStatus,
  useGetItemById,
  useGetItemsRentedByUser,
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
  const { mutate: changeRentStatus } = useChangeRentStatus();
  const [ratingValue, setRatingValue] = useState(0);
  console.log(item);

  console.log(itemData);
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
        src={itemData?.item.pictureUrl[0]}
        alt="Item"
        className="w-full h-52 object-cover rounded transform transition duration-1000 ease-in-out hover:scale-105 hover:object-contain"
      />
      <h3 className="mt-2 font-bold">{itemData?.item.title}</h3>
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
              {item.status === "requested" && (
                <Button disabled> Waiting Owner Acceptance..</Button>
              )}
              {item.status === "requestAccepted" && (
                <Button>Mark As Received</Button>
              )}

              {item.status === "rented" && <Button>Request for Return</Button>}
              {item.status === "returnRequested" && (
                <Button disabled> Return In Process</Button>
              )}
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-[500px]">
            <AlertDialogHeader>
              <AlertDialogTitle>
                {item.status === "requestAccepted" && "Mark Item As Received?"}
                {item.status === "rented" &&
                  !(new Date(item.rentEnd) < new Date()) &&
                  "Cannot return item before due date"}
                {item.status === "rented" &&
                  new Date(item.rentEnd) <= new Date() &&
                  "Request for Return ?"}
                {item.status === "returnRequested" ||
                  (item.status === "requested" && "Please Wait..")}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter className="">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  type="button"
                  onClick={() => {
                    if (item.status === "requestAccepted") {
                      console.log(item.status);

                      return changeRentStatus(
                        { rentId: item.id as string, rentStatus: "rented" },
                        {
                          onSuccess: () =>
                            toast({ title: "Item marked as received" }),
                        }
                      );
                    }
                    if (
                      item.status === "rented" &&
                      new Date(item.rentEnd) > new Date()
                    ) {
                      console.log("Cannot return before due date");
                      return;
                    }

                    if (
                      item.status === "rented" &&
                      new Date(item.rentEnd) <= new Date()
                    ) {
                      console.log("Requesting for return");
                      console.log(item.status);
                      return changeRentStatus(
                        {
                          rentId: item.id as string,
                          rentStatus: "returnRequested",
                        },
                        {
                          onSuccess: () =>
                            toast({ title: "Request for return sent" }),
                        }
                      );
                    }
                    if (
                      item.status === "returnRequested" ||
                      item.status === "requested"
                    ) {
                      console.log("Returning item");
                      console.log(item.status);
                      return;
                    }
                  }}
                >
                  Continue
                </Button>
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

const DashboardRented = () => {
  const userId = useSelector((state: RootState) => state.auth.userInfo.id);
  const { data: rentedItems, isLoading } = useGetItemsRentedByUser(
    userId as string
  );
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <section className="mb-4">
      <h2 className="text-xl font-semibold">Items You Have Rented:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-4 mt-2">
        {rentedItems?.map((item, i) => (
          <DashboardRentedCard key={i} item={item} />
        ))}
      </div>
    </section>
  );
};

export default DashboardRented;
