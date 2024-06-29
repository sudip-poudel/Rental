import sampleItems from "@/sampleData/itemSamples";
import Card from "./ui/card";
import { useNavigate } from "react-router-dom";

const Items = () => {
  const navigate = useNavigate();

  const handleCard = (id) => {
    console.log("card clicked");
    console.log(id);
    navigate(`/itempage/${id}`);
  };

  return (
    <>
      
      <div className="mt-12 grid place-content-center place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {sampleItems.map((item, i) => (
          <Card
            onClick={handleCard.bind(this, item.id)}
            className="rounded-lg shadow-md overflow-hidden "
            item={item}
            key={i}
          />
        ))}
      </div>
    </>
  );
};

export default Items;
