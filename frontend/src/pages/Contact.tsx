import React, { useState } from "react";
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
    const regEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regEx.test(email);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formErrors = {
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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <p className="mb-4 text-gray-700">
            We would love to hear from you! Whether you have a question about
            features, pricing, need a demo, or anything else, our team is ready
            to answer all your questions.
          </p>
          <p className="mb-4 text-gray-700">You can also reach us at:</p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Email: support@example.com</li>
            <li>Phone: +123 456 7890</li>
            <li>Address: 123 Main Street, Anytown, USA</li>
          </ul>
          <p className="text-gray-700">
            Our office hours are Monday to Friday, 9 AM to 5 PM. We look forward
            to hearing from you!
          </p>
        </div>
        <div className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg">
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
            <div className="flex items-center justify-between">
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
