import { Outlet } from "react-router-dom"; // Assuming you're using react-router for navigation
import Navbar from "./Navbar";
import Footer from "./Footer";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* This is where your page components will be rendered */}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
