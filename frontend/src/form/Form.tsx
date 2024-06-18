import axios from "axios";

import { useState } from "react";
import { Slot } from "@radix-ui/react-slot";
import { Button } from "@/components/ui/button";
import upload from "/images/upload.png";
import { useRef } from "react";

interface formData {
  title: string;
  category: string;
  rate: number;

  photos: File[];
  // Add other fields as needed
  description: string;
  rentalPeriod: string;
  // availabilityDates: string;
  pickupLocation: string;
  specialInstructions: string;
  agreement: boolean;
  liabilityWaiver: boolean;
}

const RentProductForm = () => {
  const [formData, setFormData] = useState<formData>({
    title: "",
    photos: [],
    description: "",
    category: "",
    rate: 0,
    rentalPeriod: "",
    // availabilityDates: "",
    pickupLocation: "",
    specialInstructions: "",
    agreement: false,
    liabilityWaiver: false,
  });

  const uploadRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(value);
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photos: [...formData.photos, ...Array.from(e.target.files[0])],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fromPayload = new FormData();
    Object.keys(formData).forEach((key) => {
      fromPayload.append(key, formData[key]);
    });

    // Handle form submission

    try {
      const response = await axios.post(
        "localhost:5137/item/additem",
        fromPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log("Submitting Error", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Rent Out Your Items
      </h1>
      <form onSubmit={handleSubmit}>
        <Slot className="mb-4">
          <input
            type="text"
            name="title"
            placeholder="Add Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </Slot>
        <Slot className="mb-4">
          <div className="flex items-center justify-center">
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
              <div className="upload-div">
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
            name="productDescription"
            placeholder="Item Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </Slot>
        <Slot className="mb-4">
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
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
            value={formData.pickupLocation}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </Slot>

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
        <Slot className="mt-6">
          <Button type="submit" className="w-full text-lg">
            Submit
          </Button>
        </Slot>
      </form>
    </div>
  );
};

export default RentProductForm;
