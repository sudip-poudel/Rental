import { MapPin } from "lucide-react";
import { Button } from "./button";

interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  created_at: string;
  location: string;
  rate: number;

}

const Card = ({ item, className, onClick }: { item: Item; className?: string; onClick: React.MouseEventHandler  <HTMLElement>}) => {
  return (
    <div onClick={onClick}
      className={`w-full sm:w-[95%] transform transition duration-500 ease-in-out hover:scale-105 ${className}`}
    >
      <img
        className="w-full h-40 object-cover"
        src={`https://images.unsplash.com/photo-1417325384643-aac51acc9e5d`}
        alt={item.title}
      />
      <div className="px-4 py-2">
        <div className="font-bold text-lg mb-2">{item.title}</div>
        <p className="text-gray-700 text-sm">{item.description}</p>
        <p className="text-gray-700 text-sm flex gap-2 items-center">
          <MapPin size={18} /> {item.location}
        </p>
        <div className="flex items-center justify-around">
          <p className="text-gray-700 font-semibold">Rate: ${item.rate} /day</p>
          <Button className="font-bold py-1 px-2 rounded ">Rent Now</Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
