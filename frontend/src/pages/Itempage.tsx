import { useParams } from "react-router-dom";
import camera from "/images/camera.png";
import for_rent from "/images/for_rent.png";
import Card from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  useGetItemById,
  useGetItems,
  useRentItem,
} from "@/api/itemsQueriesAndMutation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import DateRangePicker from "@/components/DateRangePicker";
import { DateRange } from "react-day-picker";
import { IRentDetails, RootState } from "@/types/types";
import { useSelector } from "react-redux";
import Map from "@/components/Map";

const Itempage = () => {
  const { id } = useParams();
  const userId = useSelector((state: RootState) => state.auth.userToken);
  //TODO only show items with status available

  const { data: itemDetails, isLoading: isItemDetailsLoading } = useGetItemById(
    id as string
  );
  const { data: availableItems, isLoading: isAllItensLoading } = useGetItems();
  const { mutate: addToRent, isPending: isaddToRentLoading } = useRentItem();


  const [rentData, setRentData] = useState<IRentDetails>({
    item: id as string,
    rentStart: undefined,
    rentEnd: undefined,
    rentedBy: userId as string,
    rate: itemDetails?.rate as number,
    initialDeposit: itemDetails?.initialDeposit as number,
  });

  const [selectDate, setselectDate] = useState<DateRange | undefined>();
  const [dateError, setDateError] = useState(false);

  const [date, handleDateChange] = useState<DateRange | undefined>();

  useEffect(() => {
    console.log(itemDetails);

    setselectDate(date);
    if (date) {
      setDateError(false);
      setRentData({
        ...rentData,
        rentStart: date.from,
        rentEnd: date.to,
      });
    }
  }, [date]);

  // const result = sampleItems.find((item) => item.id === id);
  const result = itemDetails;

  console.log(result);
  const similarItems = availableItems?.filter(
    (item) => item.category === result?.category
  );
  const relatedItems = similarItems?.filter((item) => item.id !== result?.id);
  // console.log(similarItems);

  const navigate = useNavigate();
  if (isItemDetailsLoading || isAllItensLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <img src="/images/loaderBlack.svg" alt="Loading..." />
      </div>
    );
  }

  const handleRentItem = () => {
    console.log(dateError);
    if (!date) {
      setDateError(true);
      return;
    }

    const data: IRentDetails = {
      item: id as string,
      rentedBy: userId as string,
      rate: itemDetails?.rate as number,
      initialDeposit: itemDetails?.initialDeposit as number,
      rentStart: date?.from,
      rentEnd: date?.to,
    };
    console.log(data);

    addToRent(data, { onSuccess: () => console.log("success") });

    console.log(data);
  };
  const handleCard = (id) => {
    // console.log("card clicked");
    // console.log(id);
    navigate(`/itempage/${id}`);
  };
  return (
    <>
      <div>
        {result && (
          <div className=" flex items-center justify-center">
            <div className="  h-46 w-4/5 flex flex-row">
              <div className="w-2/6 m-10  shadow-md bg-white border rounded-lg flex items-center justify-center transform transition duration-500 ease-in-out hover:scale-105">
                <img className="w-full  " src={result.pictureUrl[0]} alt="Camera" />
              </div>
              <div className=" w-1/2 m-10 flex flex-col p-5">
                <div className="mt-2 flex flex-col border rounded-md shadow-md bg-white p-5">
                  <div className="flex gap-2">
                    <img
                      src={for_rent}
                      alt="for_rent image"
                      className="h-10 w-10"
                    />
                    <div className=" text-2xl  font-bold mt-2">
                      {result.title}
                    </div>{" "}
                  </div>
                  <div className="text-lg mt-2">{result.description}</div>
                  <div className="mt-2 flex gap-5">
                    <h1>Rate:</h1>Rs.{result.rate} per/day
                  </div>
                  <div className="mt-2">
                    Initial Deposit: Rs.{result.initialDeposit}
                  </div>
                  <div className="mt-2 flex flex-col ">
                    <p className="flex items-center gap-2">
                      Location
                      <MapPin size={22} />:
                    </p>
                    <p>{result.locationDetails.location}</p>
                  </div>
                  <div className="mt-4">
                    <p className="font-semibold mb-2">Select rental period:</p>
                    <DateRangePicker
                      className={`${
                        dateError ? "border border-red-500" : ""
                      } w-full`}
                      handleDateChange={handleDateChange}
                      date={selectDate}
                    />
                  </div>
                  {/* <div className="mt-2 cursor-pointer"> <PhoneCall size={18} /> {result?.contact}</div> */}
                </div>
                <Button type="button" onClick={handleRentItem}>
                  {isaddToRentLoading && (
                    <img
                      width={18}
                      height={18}
                      className="mr-2"
                      src="/images/loader.png"
                      alt="loading..."
                    />
                  )}
                  Rent Item
                </Button>
                <div className="flex flex-col">
                  <h1 className="font-semibold text-lg">Pickup Location:</h1>
                  <Map
                    classname="z-0"
                    isPreview={true}
                    marker={[
                      itemDetails.locationDetails.latitude,
                      itemDetails.locationDetails.longitude,
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-12 ml-10 font-bold">Related Items:</div>
      <div className=" mt-12 grid place-content-center place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {relatedItems?.map((item, i) => (
          <Card
            onClick={handleCard.bind(this, item.id)}
            className="rounded-lg shadow-md overflow-hidden "
            item={item}
            key={i}
          />
        ))}
      </div>
    </>
  );
};

export default Itempage;
