import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const ContactUs = () => {
  const [contactInput, setContactInput] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactInput({
      ...contactInput,
      [event.target.name]: event.target.value,
    });
  };

  const validateEmail = (email: string) => {
    const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regEx.test(email);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let formErrors = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };

    if (contactInput.name === "") {
      formErrors.name = "Name is required";
    }
    if (contactInput.email === "") {
      formErrors.email = "Email is required";
    } else if (!validateEmail(contactInput.email)) {
      formErrors.email = "Invalid email address";
    }
    if (contactInput.subject === "") {
      formErrors.subject = "Subject is required";
    }
    if (contactInput.message === "") {
      formErrors.message = "Message is required";
    }

    setErrors(formErrors);

    if (
      formErrors.name === "" &&
      formErrors.email === "" &&
      formErrors.subject === "" &&
      formErrors.message === ""
    ) {
      // Submit form data
      console.log("Form submitted:", contactInput);
      // Reset form
      setContactInput({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Contact Us</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={contactInput.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.name && <p className="text-red-600">{errors.name}</p>}
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={contactInput.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.email && <p className="text-red-600">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={contactInput.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.subject && (
                <p className="text-red-600">{errors.subject}</p>
              )}
            </div>
            <div className="mb-4">
              <textarea
                name="message"
                placeholder="Your Message"
                value={contactInput.message}
                onChange={handleInputChange}
                className="w-full h-40 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              ></textarea>
              {errors.message && (
                <p className="text-red-600">{errors.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full text-lg">
              Send Message
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
