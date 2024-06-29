import axios from "axios";

import { useState } from "react";
import { Slot } from "@radix-ui/react-slot";
import { Button } from "@/components/ui/button";
import upload from "/images/upload.png";
import { useRef } from "react";
import { ICategoryType, IFormData } from "@/types/types";
import Modal from "@/components/modal";
import { MapPopup } from "@/components/Map";
import { useGetCategories } from "@/api/itemsQueriesAndMutation";

const RentProductForm = () => {
  const [formData, setFormData] = useState<IFormData>({
    title: "",
    photos: [],
    description: "",
    category: "",
    rate: 0,
    rentalPeriod: "",
    // availabilityDates: "",
    pickupLocation: {
      location: "",
      latitude: 0,
      longitude: 0,
    },
    specialInstructions: "",
    agreement: false,
    liabilityWaiver: false,
  });
  const [showPopup, setShowPopup] = useState(false);
  const { data: category, isFetched } = useGetCategories();

  const uploadRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // console.log(value);
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photos: [...formData.photos, ...Array.from(e.target.files)] as File[],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    console.log(e.target.files);
    const fromPayload = new FormData(e.target);
    fromPayload.set("pickupLocation", JSON.stringify(formData.pickupLocation));
    console.log(typeof fromPayload);
    for (const [key, value] of fromPayload) {
      console.log(`${key}: ${value}`);
    }

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/item/additem`,
      fromPayload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    console.log(response);
  };

  return (
    <div className=" mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Rent Out Your Items
      </h1>
      <form
        name="addItemForm"
        onSubmit={handleSubmit}
        className="grid grid-cols-1  md:grid-cols-2 gap-2"
      >
        <Slot className="mb-4">
          <input
            type="text"
            name="title"
            placeholder="Add Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full h-16 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </Slot>
        <Slot className="mb-4">
          <input
            type="number"
            name="rate"
            placeholder="Rental Rate (Rs./day)"
            value={formData.rate}
            onChange={handleChange}
            required
            className="w-full  h-16 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </Slot>
        <Slot className="mb-4">
          <div className="flex flex-col items-center justify-center">
            <div
              onClick={handleImageUpload}
              className="w-full h-40 flex flex-col cursor-pointer px-4 py-2 border items-center justify-center rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <img src={upload} alt="upload" className="h-20 w-20 " />
              <p className="">choose a photo</p>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                name="photos"
                placeholder="Upload photo of item"
                required
                // value={formData.photos}
                ref={uploadRef}
                className="hidden"
              />
              <div className="upload-div relative">
                {formData.photos.map((photo, index) => {
                  const photoURL = URL.createObjectURL(photo);
                  return (
                    <img
                      key={index}
                      src={photoURL}
                      alt={`Upload ${index}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        margin: "5px",
                      }}
                      onLoad={() => URL.revokeObjectURL(photoURL)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </Slot>
        <Slot className="mb-4">
          <input
            type="text"
            name="description"
            placeholder="Item Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </Slot>
        <Slot className="mb-4">
          <select
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
        </Slot>

        <Slot className="mb-4">
          <input
            type="text"
            name="rentalPeriod"
            placeholder="Max. Rental Period"
            value={formData.rentalPeriod}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </Slot>
        {/* <Slot className="mb-4">
          <input
            type="date"
            name="availabilityDates"
            placeholder="Availability Dates"
            value={formData.availabilityDates}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </Slot> */}

        <Slot className="mb-4">
          <input
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
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </Slot>
        {showPopup && (
          <Modal setShowModal={setShowPopup}>
            <MapPopup handleChange={setFormData} />
          </Modal>
        )}

        <Slot className="mb-4">
          <textarea
            name="specialInstructions"
            placeholder="Special Instructions"
            value={formData.specialInstructions}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </Slot>
        <Slot className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="agreement"
              checked={formData.agreement}
              onChange={handleChange}
              className="mr-2"
            />
            I agree to the terms and conditions
          </label>
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
      </form>
      <Slot className="mt-6">
        <div className=" flex items-center justify-center">
          <Button type="submit" className="w-full sm:w-1/4 text-lg">
            Submit
          </Button>
        </div>
      </Slot>
    </div>
  );
};

export default RentProductForm;
