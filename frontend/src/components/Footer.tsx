import { Facebook, Instagram, Mail, Phone, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="ml-3 mt-5 flex pb-3 flex-col md:flex-row justify-around gap-4 md:gap-0 border-t-2 pt-2">
      <div className="flex flex-col  items-center  ">
        <section className="flex items-end gap-3">
          <img src="/images/rent.png" alt="blob" className="h-10 w-10" />
          <p className="font-bold"> RentHub</p>
        </section>
        <p className="text-xs mt-1">Rent items with ease and convinience!</p>
        <section className="flex flex-row gap-5 mt-4">
          <Link to={"#"}>
            <Facebook size={24} />
          </Link>
          <Link to={"#"}>
            <Instagram size={24} />
          </Link>
          <Link to={"#"}>
            <Twitter size={24} />
          </Link>
        </section>
      </div>
      <div>
        <h1 className="font-bold text-center">Quick Links</h1>
        <section className="text-sm flex flex-col items-start  ">
          <Link className="hover:underline" to="/">
            Home
          </Link>
          <Link to="/signin" className="hover:underline">
            Join As Renter
          </Link>
          <Link className="hover:underline" to="/about">
            About Us
          </Link>
          <Link className="hover:underline" to="/contact">
            Contact Us
          </Link>
          <Link className="hover:underline" to={"#"}>
            FAQ
          </Link>
        </section>
      </div>
      <div className="mr-3 flex flex-col items-center">
        <h1 className="font-bold">Contact Us</h1>
        <section className="text-xs">
          <p>Need help?</p>
          <p>24/7 customer support available</p>
        </section>
        <div className="flex flex-row mt-2">
          <Phone size={20} />
          <span className="ml-1">+234 123 456 7890</span>
        </div>
        <div className="flex flex-row mt-2">
          <Mail size={20} />
          <span className="ml-1">
            <a href="mailto:support@renthub.com" className="underline">
              support@renthub.com
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
