import { useEffect,useState } from "react";
import axios from "axios";

// import sampleItems from "@/sampleData/itemSamples";
import Card from "./ui/card";
import { useNavigate } from "react-router-dom";

// import { SearchResultItem } from "@/types/types";



const Items = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  // console.log(items);

  useEffect(() => {
    const fetchItems =async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/item/item`,
          {
            withCredentials: true,
          }
        );
        const result = response.data;
        setItems(result);
        console.log(result);

      } catch (error) {
        console.log(error);
      }
    }
    fetchItems();
  }, []);

  const handleCard = (id) => {
    console.log("card clicked");
    console.log(id);
    navigate(`/itempage/${id}`);
  };

  return (
    <>
      
      <div className="mt-12 grid place-content-center place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {items.map((item, i) => (
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
