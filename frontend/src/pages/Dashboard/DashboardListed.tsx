import {
  useChangeRentStatus,
  useDeleteItem,
  useGetItemsListedByUser,
  useGetRentalDetailsByItemId,
} from "@/api/itemsQueriesAndMutation";
import { useSelector } from "react-redux";
import { IItem, RootState } from "@/types/types";

import { Eye, InfoIcon, Pencil, Trash2 } from "lucide-react";
import { TooltipDemo } from "@/components/TooltipDemo";
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
import { Button } from "@/components/ui/button";

import { toast, useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useNavigate } from "react-router-dom";

const DashboardListings = ({ userId }) => {
  const { data: itemsListed, isPending } = useGetItemsListedByUser(userId);
  const { mutate: deleteItem } = useDeleteItem();
  const navigate = useNavigate();

  if (isPending || !itemsListed) {
    return <p>Loading...</p>;
  }
  if (!isPending) {
    //TODO add way to accept rent and add return date and start date in info hovr of status
    return (
      <div className="mt-5">
        {itemsListed?.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 text-left">Title</th>
                <th className="border p-2 text-left">Rate</th>
                <th className="border p-2 text-left">Initial Deposit</th>
                <th className="border p-2 text-left">Status</th>
                <th className=" border p-2 text-left ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {itemsListed?.map((item) => {
                if (item.item.itemStatus === "inrent") {
                  return <ListedItemsHelper itemDetails={item} />;
                }
                return (
                  <tr
                    key={item.item.id}
                    className="odd:bg-white even:bg-gray-100"
                  >
                    <td className="border p-2">{item.item.title}</td>
                    <td className="border p-2">Rs.{item.item.rate}</td>
                    <td className="border p-2">
                      Rs.{item.item.initialDeposit}
                    </td>
                    <td className="border p-2">{item.item.itemStatus}</td>
                    <td className="border p-2">
                      <button
                        className="text-blue-500 hover:text-blue-700 mx-1"
                        onClick={() => {
                          navigate(`/itempage/${item.item.id}`);
                        }}
                      >
                        <TooltipDemo Trigger={<Eye />} content="View Details" />
                      </button>
                      <button className="text-green-500 hover:text-green-700 mx-1">
                        <TooltipDemo Trigger={<Pencil />} content="Edit Item" />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 mx-1"
                        onClick={() => {
                          deleteItem(item.item.id, {
                            onSuccess: (data) => {
                              toast({ title: data.message });
                            },
                          });
                        }}
                      >
                        <TooltipDemo
                          Trigger={<Trash2 />}
                          content="Delete Item"
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No items listed.</p>
        )}
      </div>
    );
  }
  console.log(itemsListed);
  return <div>listings</div>;
};
const ListedItemsHelper = ({ itemDetails }: { itemDetails: IItem }) => {
  // TODO add new api to get rentdetails from item id
  const { data: item, isLoading: idItemLoading } = useGetRentalDetailsByItemId(
    itemDetails.item.id
  );
  const { mutate: changeRentStatus } = useChangeRentStatus();
  const { toast } = useToast();
  const navigate = useNavigate();
  if (!item || idItemLoading) {
    return <div>loading</div>;
  }
  return (
    <tr key={itemDetails.item.id} className="odd:bg-white even:bg-gray-100">
      <td className="border p-2">{itemDetails.item.title}</td>
      <td className="border p-2">Rs.{itemDetails.item.rate}</td>
      <td className="border p-2">Rs.{itemDetails.item.initialDeposit}</td>
      <td className="border p-2">
        <div className="flex gap-2">
          <Toaster />
          Inrent
          <TooltipDemo
            Trigger={<InfoIcon />}
            content="Item is currently rented out"
          />
        </div>
      </td>
      <td className="border p-2">
        <div className="flex flex-row">
          <AlertDialog>
            <AlertDialogTrigger className="">
              <div className="text-center flex items-center justify-center">
                {item.status === "requested" && (
                  <Button> Accept Rent Request </Button>
                )}
                {item.status === "requestAccepted" && (
                  <Button disabled>Waiting for Dispatch</Button>
                )}
                {item.status === "rented" && (
                  <Button disabled>Waiting for Return request..</Button>
                )}

                {item.status === "returnRequested" && (
                  <Button>Return Received?</Button>
                )}
                {/* {item.status === "rented" && (
                  <Button disabled> Item in rent</Button>
                )} */}
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-[500px]">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {item.status === "requested" && "Accept Rent Request?"}
                  {item.status === "returnRequested" &&
                    " Return Item Received?"}
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter className="">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    type="button"
                    onClick={() => {
                      if (item.status === "requested") {
                        console.log(item.status);

                        return changeRentStatus(
                          {
                            rentId: item.id as string,
                            rentStatus: "requestAccepted",
                          },
                          {
                            onSuccess: () =>
                              toast({ title: "Rent Request Accepted" }),
                          }
                        );
                      }
                      if (
                        item.status === "returnRequested" &&
                        new Date(item.rentEnd) >= new Date()
                      ) {
                        console.log("accept return");
                        console.log(item.status);
                        return changeRentStatus(
                          {
                            rentId: item.id as string,
                            rentStatus: "returnAccepted",
                          },
                          {
                            onSuccess: () =>
                              toast({ title: "Rental Successful" }),
                          }
                        );
                      }
                    }}
                  >
                    Continue
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <button
            className="text-blue-500 hover:text-blue-700 mx-1"
            onClick={() => {
              navigate(`/itempage/${itemDetails.item.id}`);
            }}
          >
            <TooltipDemo Trigger={<Eye />} content="View Details" />
          </button>
          <button className="text-green-500 hover:text-green-700 mx-1">
            <TooltipDemo Trigger={<Pencil />} content="Edit Item" />
          </button>
          <button
            className="text-red-500 hover:text-red-700 mx-1"
            onClick={() => {
              toast({ title: "Cannot Delete Item On Rent" });
            }}
          >
            <TooltipDemo Trigger={<Trash2 />} content="Delete Item" />
          </button>
        </div>
      </td>
    </tr>
  );
};
const DashboardListed = () => {
  const userId = useSelector((state: RootState) => state.auth.userInfo.id);

  return (
    <section className="mb-4">
      <h2 className="text-xl font-semibold">Items you've listed:</h2>
      <DashboardListings userId={userId} />
    </section>
  );
};

export default DashboardListed;
