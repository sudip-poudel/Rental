import { useParams } from "react-router-dom";
import Slider from "react-slick";
import for_rent from "/images/for_rent.png";
import available from "/images/available.png";
import Card from "@/components/ui/card";
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
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

const Itempage = () => {
  const { toast } = useToast();
  const { id } = useParams();
  const userId = useSelector((state: RootState) => state.auth.userInfo.id);
  //TODO only show items with status available

  const { data: itemDetails, isLoading: isItemDetailsLoading } = useGetItemById(
    id as string
  );
  const { data: availableItems, isLoading: isAllItensLoading } = useGetItems();
  const { mutate: addToRent, isPending: isaddToRentLoading } = useRentItem();

  //TODO: this may be wrong because i entered status to correct the type error
  const [rentData, setRentData] = useState<IRentDetails>({
    item: id as string,
    rentStart: new Date() as Date,
    rentEnd: new Date() as Date,
    rentedBy: userId as string,
    rate: itemDetails?.item.rate as number,
    initialDeposit: itemDetails?.item.initialDeposit as number,
    id: "",
    status: "requested",
  });

  const [selectDate, setselectDate] = useState<DateRange | undefined>();
  const [dateError, setDateError] = useState(false);

  const [date, handleDateChange] = useState<DateRange | undefined>();

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={itemDetails?.item.pictureUrl[i]} />
        </a>
      );
    },
    dots: true,
    infinite: true,
    dotsClass: "slick-dots slick-thumb",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    console.log(itemDetails);

    setselectDate(date);
    if (date) {
      setDateError(false);
      setRentData({
        ...rentData,
        rentStart: date.from as Date,
        rentEnd: date.to as Date,
      });
    }
  }, [date]);

  // const result = sampleItems.find((item) => item.id === id);
  const result = itemDetails;

  // console.log(result);
  const similarItems = availableItems?.filter(
    (item) => item.item.category === result?.item.category
  );
  const relatedItems = similarItems?.filter(
    (item) => item.item.id !== result?.item.id
  );
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
    //TODO: this may be wrong because i entered status to correct the type error
    const data: IRentDetails = {
      item: id as string,
      rentedBy: userId as string,
      rate: itemDetails?.item.rate as number,
      initialDeposit: itemDetails?.item.initialDeposit as number,
      rentStart: date?.from as Date,
      rentEnd: date?.to as Date,
      status: `requested`,
    };
    console.log(data);

    addToRent(data, {
      onSuccess: () =>
        toast({
          title: "Successfully Requested for rent.(Goto Dashboard for more)",
        }),
    });

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
        <Toaster />
        {result && (
          <div className=" flex items-center justify-center">
            <div className=" h-46 w-4/5 flex flex-col md:flex-row overflow-hidden">
              {/* <div className="w-5/6 md:w-2/6 m-10  shadow-md bg-white border rounded-lg flex items-center justify-center transform transition duration-500 ease-in-out hover:scale-105">
                <img className="w-full  " src={camera} alt="Camera" />
              </div> */}
              <div className=" w-5/6 md:w-2/6 m-10 shadow-md bg-white border rounded-lg flex items-center justify-center">
                <Slider {...settings} className="w-full">
                  {itemDetails.item.pictureUrl.map(
                    (url: string, index: number) => (
                      <div key={index} className="w-full">
                        <img
                          src={url}
                          alt={`Item image ${index + 1}`}
                          className="h-64 w-full object-contain rounded-lg"
                        />
                      </div>
                    )
                  )}
                </Slider>
              </div>
              <div className="w-full md:w-1/2 md:m-10 flex flex-col md:p-5">
                <div className="my-4 flex flex-col border rounded-lg shadow-lg bg-white p-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        itemDetails.item.itemStatus === "inrent"
                          ? for_rent
                          : available
                      }
                      alt="for_rent image"
                      className="h-12 w-12 rounded-full"
                    />
                    <div className="text-2xl font-bold">
                      {result.item.title}
                    </div>
                  </div>

                  <div className="text-lg mt-4">{result.item.description}</div>

                  <div className="mt-4 flex items-center gap-2">
                    <span className="font-semibold w-32">Rate:</span>
                    <span>Rs.{result.item.rate} per/day</span>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-semibold w-32">Initial Deposit:</span>
                    <span>Rs.{result.item.initialDeposit}</span>
                  </div>

                  <div className="flex items-start gap-2 mt-4">
                    <span className="font-semibold w-32">Location:</span>
                    <p className="">{result.item_location.location}</p>
                  </div>

                  <div className="mt-6">
                    <p className="font-semibold mb-2">Select rental period:</p>
                    <DateRangePicker
                      className={`${
                        dateError ? "border border-red-500" : ""
                      } w-full`}
                      handleDateChange={handleDateChange}
                      date={selectDate}
                    />
                  </div>

                  {/* <div className="mt-4 cursor-pointer"> 
      <PhoneCall size={18} /> {result?.contact}
    </div> */}
                </div>
                <Button
                  type="button"
                  onClick={handleRentItem}
                  disabled={
                    itemDetails.item.itemStatus === "inrent" ||
                    itemDetails.item.itemStatus === "unavailable"
                  }
                >
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
                      itemDetails.item_location.latitude,
                      itemDetails.item_location.longitude,
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
            onClick={handleCard.bind(this, item.item.id)}
            className="rounded-lg shadow-md overflow-hidden"
            item={item}
            key={i}
          />
        ))}
      </div>
    </>
  );
};

export default Itempage;
