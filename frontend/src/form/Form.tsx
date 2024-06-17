import { useState } from "react";
import { Slot } from "@radix-ui/react-slot";
import { Button } from "@/components/ui/button";

const RentProductForm = () => {
  const [formState, setFormState] = useState({
    title: "",
    productDescription: "",
    category: "",
    price: "",
    rentalPeriod: "",
    availabilityDates: "",
    securityDeposit: "",
    cancellationPolicy: "",
    ownerName: "",
    contactEmail: "",
    contactPhone: "",
    pickupLocation: "",
    deliveryOptions: "",
    deliveryAddress: "",
    specialInstructions: "",
    agreement: false,
    liabilityWaiver: false,
    photos: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormState({
      ...formState,
      photos: [...formState.photos, ...e.target.files],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
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
            value={formState.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </Slot>
        <Slot className="mb-4">
          <div className="flex items-center justify-center">
            <input
              type="file"
              name="photos"
              placeholder="Upload photo of item"
              required
              value={formState.photos}
              onChange={handleChange}
              className="w-full h-40 flex  px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </Slot>
        <Slot className="mb-4">
          <textarea
            name="productDescription"
            placeholder="Item Description"
            value={formState.productDescription}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            rows="4"
          />
        </Slot>
        <Slot className="mb-4">
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formState.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </Slot>
        <Slot className="mb-4">
          <input
            type="number"
            name="price"
            placeholder="Rental Price"
            value={formState.price}
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
            value={formState.rentalPeriod}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </Slot>
        <Slot className="mb-4">
          <input
            type="date"
            name="availabilityDates"
            placeholder="Availability Dates"
            value={formState.availabilityDates}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </Slot>

        <Slot className="mb-4">
          <input
            type="email"
            name="contactEmail"
            placeholder="Contact Email"
            value={formState.contactEmail}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </Slot>
        <Slot className="mb-4">
          <input
            type="tel"
            name="contactPhone"
            placeholder="Contact Phone Number"
            value={formState.contactPhone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </Slot>
        <Slot className="mb-4">
          <input
            type="text"
            name="pickupLocation"
            placeholder="Pickup Location"
            value={formState.pickupLocation}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </Slot>

        <Slot className="mb-4">
          <textarea
            name="specialInstructions"
            placeholder="Special Instructions"
            value={formState.specialInstructions}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </Slot>
        <Slot className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="agreement"
              checked={formState.agreement}
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
              checked={formState.liabilityWaiver}
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
