import { useEffect, useState } from "react";
import { Slot } from "@radix-ui/react-slot";
import { Button } from "@/components/ui/button";
import upload from "/images/upload.png";
import { useRef } from "react";
import { ICategoryType, IFormData } from "@/types/types";
import { MapPopup } from "@/components/Map";
import { useAddItem, useGetCategories } from "@/api/itemsQueriesAndMutation";
import DateRangePicker from "@/components/DateRangePicker";
import { DateRange } from "react-day-picker";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const RentProductForm = () => {
  const [formData, setFormData] = useState<IFormData>({
    title: "",
    photos: [],
    description: "",
    category: "",
    rate: 0,
    rentalPeriod: undefined,
    pickupLocation: {
      location: "",
      latitude: 0,
      longitude: 0,
    },
    specialInstructions: "",
    initialDeposit: 0,
    agreement: false,
    liabilityWaiver: false,
  });
  const [showPopup, setShowPopup] = useState(false);
  const { data: category, isFetched } = useGetCategories();
  const { mutate: addItem, isPending } = useAddItem();
  const { toast } = useToast();

  const uploadRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };
  const handleRemoveImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // console.log(value);
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const [date, handleDateChange] = useState<DateRange | undefined>();

  useEffect(() => {
    setFormData((prev) => ({ ...prev, rentalPeriod: date }));
  }, [date]);
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photos: [...formData.photos, ...Array.from(e.target.files)] as File[],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fromPayload = new FormData(e.target);
    fromPayload.set("pickupLocation", JSON.stringify(formData.pickupLocation));
    if (formData.rentalPeriod?.from && formData.rentalPeriod?.to) {
      fromPayload.set("rentEnd", formData.rentalPeriod?.to.toISOString());
      fromPayload.set("rentStart", formData.rentalPeriod?.from.toISOString());
    }
    formData.photos.forEach((photo) => {
      fromPayload.append("photos", photo);
    });
    addItem(fromPayload, {
      onError: (error) => {
        toast({ title: "Error adding item", description: error.message });
        setFormData({
          title: "",
          photos: [],
          description: "",
          category: "",
          rate: 0,
          rentalPeriod: undefined,
          pickupLocation: {
            location: "",
            latitude: 0,
            longitude: 0,
          },
          specialInstructions: "",
          initialDeposit: 0,
          agreement: false,
          liabilityWaiver: false,
        });
      },
      onSuccess: () => {
        setFormData({
          title: "",
          photos: [],
          description: "",
          category: "",
          rate: 0,
          rentalPeriod: undefined,
          pickupLocation: {
            location: "",
            latitude: 0,
            longitude: 0,
          },
          specialInstructions: "",
          initialDeposit: 0,
          agreement: false,
          liabilityWaiver: false,
        });
        toast({ title: "Item added successfully" });
      },
    });
  };

  return (
    <div className=" mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <Toaster />
      <h1 className="text-2xl font-bold mb-6 text-center">
        Rent Out Your Items
      </h1>
      <form
        name="addItemForm"
        onSubmit={handleSubmit}
        className="grid grid-cols-1  md:grid-cols-2 gap-2"
      >
        <Slot className="mb-4">
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Title:
            </label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Add Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full h-16 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </Slot>
        <Slot className="mb-4">
          <div>
            <label
              htmlFor="rate"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Rental Rate (Rs./day):
            </label>
            <input
              id="rate"
              type="number"
              name="rate"
              placeholder="Rental Rate (Rs./day)"
              value={formData.rate}
              onChange={handleChange}
              required
              className="w-full h-16 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </Slot>
        <Slot className="mb-4">
          <div className="flex flex-col justify-center">
            <label
              htmlFor="photos"
              className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer text-left"
            >
              Photos:
            </label>
            <div
              onClick={(e) => {
                if ((e.target as HTMLElement).nodeName !== "BUTTON") {
                  handleImageUpload();
                }
              }}
              className="w-full h-40 flex overflow-y-auto flex-col cursor-pointer px-4 py-2 border items-center justify-center rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <img src={upload} alt="upload" className="h-20 w-20 " />
              <p className="">choose a photo</p>
              <input
                id="photos"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                name="photos"
                placeholder="Upload photo of item"
                required
                // value={formData.photos}
                ref={uploadRef}
                className="hidden"
              />
              <div className="flex flex-row relative">
                {formData.photos.map((photo, index) => {
                  const photoURL = URL.createObjectURL(photo);
                  return (
                    <div key={index} className="relative group">
                      <img
                        // key={index}
                        src={photoURL}
                        alt={`Upload ${index}`}
                        className="h-20 w-20 object-cover rounded-lg"
                        onLoad={() => URL.revokeObjectURL(photoURL)}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs opacity-100"
                        style={{ zIndex: 10 }}
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Slot>
        <Slot className="mb-4">
          <div className="flex flex-col h3/4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description:
            </label>
            <input
              id="description"
              type="text"
              name="description"
              placeholder="Item Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 h-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </Slot>
        <Slot className="mb-4">
          <div>
            <label
              htmlFor="category"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Category:
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Select Category</option>
              {isFetched &&
                (category as ICategoryType[]).map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>
        </Slot>

        <Slot className="mb-4">
          <div>
            <label
              htmlFor="rentalPeriod"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Max. Rental Period:
            </label>
            <DateRangePicker
              handleDateChange={handleDateChange}
              date={formData.rentalPeriod}
            />
          </div>
        </Slot>

        <AlertDialog>
          <AlertDialogTrigger>
            <Slot className="mb-4">
              <div className="h-3/4">
                <label
                  htmlFor="pickupLocation"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Pickup Location:
                </label>
                <input
                  id="pickupLocation"
                  type="text"
                  name="pickupLocation"
                  placeholder="Pickup Location"
                  value={formData.pickupLocation.location}
                  onChange={handleChange}
                  onClick={() => {
                    setShowPopup(!showPopup);
                  }}
                  required
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg h-full focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </Slot>
          </AlertDialogTrigger>
          <AlertDialogContent className="overflow-y-scroll">
            <AlertDialogHeader className="h-[80%]">
              <AlertDialogTitle className="text-center">
                Choose Location
              </AlertDialogTitle>
              <AlertDialogDescription className="w-full">
                <MapPopup handleChange={setFormData} />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button type="button" onClick={() => {}}>
                  Continue
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Slot className="mb-4">
          <div className="h-3/4">
            <label
              htmlFor="specialInstructions"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Special Instructions:
            </label>
            <textarea
              id="specialInstructions"
              name="specialInstructions"
              placeholder="Special Instructions"
              value={formData.specialInstructions}
              onChange={handleChange}
              className="w-full px-4 py-2 border h-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </Slot>
        <Slot className="mb-4">
          <div className="h-3/4">
            <label
              htmlFor="initialDeposit"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Initial Deposit:
            </label>
            <input
              id="initialDeposit"
              type="number"
              name="initialDeposit"
              placeholder="Initial Deposit"
              value={formData.initialDeposit}
              onChange={handleChange}
              className="w-full px-4 py-2 border h-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </Slot>

        <Slot className="mb-4">
          <div>
            <label htmlFor="agreement" className="flex items-center">
              <input
                id="agreement"
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={handleChange}
                className="mr-2"
              />
              I agree to the terms and conditions
            </label>
          </div>
        </Slot>
        <Slot className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="liabilityWaiver"
              checked={formData.liabilityWaiver}
              onChange={handleChange}
              className="mr-2"
            />
            I accept the liability terms
          </label>
        </Slot>
        <Slot className="mb-4"></Slot>

        <Slot className="mt-6 w-full">
          <div className="w-full flex items-center justify-center">
            <Button
              type="submit"
              className="w-full sm:w-1/4 text-lg disabled:cursor-not-allowed"
              disabled={isPending}
            >
              {isPending && (
                <img
                  src="/images/loader.png"
                  height={18}
                  width={18}
                  className="mr-2"
                />
              )}
              Submit
            </Button>
          </div>
        </Slot>
      </form>
    </div>
  );
};

export default RentProductForm;
