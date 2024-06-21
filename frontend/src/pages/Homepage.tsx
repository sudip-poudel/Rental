import Footer from "@/components/Footer";
import Items from "@/components/Items";
import Navbar from "@/components/Navbar";
import Search from "@/components/Search";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <Search />
      <Items />
      <Footer />
    </>
  );
};

export default Homepage;
