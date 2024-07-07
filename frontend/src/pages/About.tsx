// import React from "react";

const About = () => {
  return (
    <>
      <div className=" w-2/3 ">
        <div className="mt-10 ml-20 ">
          <div className="flex  ">
            <h1 className="text-lg font-bold ">About RentHub:</h1>
          </div>
          <div>
            Welcome to RentHub, your one-stop destination for renting items from
            your local community. Whether you need a camera for a weekend trip,
            a bike for your city commute, a tent for your camping adventure, or
            a kayak for a day on the water, Rentable makes it easy and
            convenient to find and rent the gear you need.
          </div>
        </div>
        <div className="mt-10 ml-20">
          <div className="flex  ">
            <h1 className="text-lg font-bold ">Our Mission:</h1>
          </div>
          <div>
            At RentHub, our mission is to foster a sharing economy that benefits
            everyone. We believe in the power of community and the value of
            sharing resources. By providing a platform where people can list
            their items for rent, we aim to reduce waste, save money, and make a
            positive impact on the environment.
          </div>
        </div>
        <div className="mt-10 ml-20 ">
          <div className="flex ">
            <h1 className="text-lg font-bold ">How It Works?</h1>
          </div>
          <div className="">
            <ol className="list-decimal list-inside ">
              <li className="my-2">
                <strong> List Your Items:</strong> Have an item you’re not using
                all the time? List it on Rentable and earn extra income. Whether
                it’s a camera, bike, tent, kayak, or any other gear, you can
                make it available to your local community.
              </li>
              <li className="my-2">
                <strong>Find What You Need:</strong> Browse our extensive
                catalog of items available for rent. Use our search and filter
                features to find exactly what you’re looking for, when you need
                it.
              </li>
              <li className="my-2">
                <strong>Rent with Confidence:</strong> Rentable provides a
                secure platform for transactions. Our user reviews and ratings
                system helps you rent with confidence, knowing that you’re
                dealing with trusted community members.
              </li>
              <li className="my-2">
                <strong>Enjoy and Return:</strong> Pick up your rented item,
                enjoy it for the rental period, and return it as agreed. It’s
                that simple!
              </li>
            </ol>
          </div>
        </div>

        <div className="mt-10 ml-20">
          <div>
            <h1 className="text-lg font-bold"> Why Choose Rentable?</h1>
          </div>{" "}
          <div>
            <ul className="list-disc list-inside">
              <li className="my-2">
                <strong>Wide Selection:</strong> From high-end cameras to
                adventure gear, our platform offers a wide variety of items to
                meet your needs.
              </li>
              <li className="my-2">
                <strong> Community Driven:</strong> By renting from your
                neighbors, you support your local community and promote
                sustainable living.
              </li>
              <li className="my-2">
                <strong>Affordable: </strong>Renting is often much cheaper than
                buying, especially for items you only need temporarily.
              </li>
              <li className="my-2">
                <strong>Secure:</strong> Our platform ensures secure
                transactions and provides support in case of any issues.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 ml-20">
          <div>
            <h1 className="text-lg font-bold">Our Story</h1>
          </div>{" "}
          RentHub was founded with the vision of creating a sustainable and
          connected community where resources are shared efficiently. Our team
          is passionate about making it easy for people to access the items they
          need without the burden of ownership. By connecting renters and
          owners, we hope to build a more resourceful and eco-friendly world.
        </div>
        <div className="mt-10 ml-20">
          <div>
            <h1 className="text-lg font-bold">Get in Touch</h1>
          </div>{" "}
          Have questions or need assistance? Our support team is here to help.
          Contact us at{" "}
          <a href="#" className="text-blue-500 hover:underline">
            support@renthub.com
          </a>
          or visit our{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Help Center.
          </a>
        </div>
        <div className="mt-10 ml-20">
          <div>
            <h1 className="text-lg font-bold">Join Us</h1>
          </div>
          Be a part of the RentHub community today. Whether you’re looking to
          rent or list an item, we’re excited to have you with us. Together, we
          can make renting the new norm and contribute to a more sustainable
          future.
        </div>
      </div>
    </>
  );
};

export default About;
