import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import sampleItems from "@/sampleData/itemSamples";
import { useParams } from "react-router-dom";
import camera from "/images/camera.png";
import for_rent from "/images/for_rent.png";
import Card from "@/components/ui/card";
import { MapPin,PhoneCall } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import Items from "@/components/Items";
const Itempage = () => {
  const { id } = useParams();
  const result = sampleItems.find((item) => item.id === id);

  // console.log(result);
  const similarItems = sampleItems.filter(
    (item) => item.category === result.category
  );
  const relatedItems = similarItems.filter((item) => item.id !== result.id);
  // console.log(similarItems);
  const navigate = useNavigate();
  const handleCard = (id) => {
    // console.log("card clicked");
    // console.log(id);
    navigate(`/itempage/${id}`);
  };
  return (
    <>
      <Navbar />
      <div>
        {result && (
          <div className=" flex items-center justify-center">
            <div className=" m-20 h-46 w-4/5 flex flex-row">
              <div className="w-1/2 m-10  shadow-md bg-white border rounded-lg flex items-center justify-center transform transition duration-500 ease-in-out hover:scale-105">
                <img className="w-full h-auto " src={camera} alt="Camera" />
              </div>
              <div className=" w-1/2 m-10 flex flex-col p-5">
                <img
                  src={for_rent}
                  alt="for_rent image"
                  className="h-10 w-10"
                />
                <div className="border rounded-md text-2xl  font-bold mt-2">
                  {result.title}
                </div>
                <div className="text-lg mt-2">{result.description}</div>
                <div className="flex flex-col border rounded-md bg-white p-5">
                  {/* <div className="mt-2">{result.category}</div> */}
                  <div className="mt-2">Rs.{result.rate}</div>
                  <div className="mt-2 flex">
                    <MapPin size={18} /> {result.location}
                  </div>
                   <div className="mt-2 cursor-pointer"> <PhoneCall size={18} /> {result.contact}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-12 ml-10 font-bold">Related Items:</div>
      <div className=" mt-12 grid place-content-center place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {relatedItems.map((item, i) => (
          <Card
            onClick={handleCard.bind(this, item.id)}
            className="rounded-lg shadow-md overflow-hidden "
            item={item}
            key={i}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Itempage;
