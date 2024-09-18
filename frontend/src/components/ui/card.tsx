import { MapPin } from "lucide-react";
import { Button } from "./button";
import { IItem } from "@/types/types";

const Card = ({
  item,
  className,
  onClick,
}: {
  item: IItem;
  className?: string;
  onClick: React.MouseEventHandler<HTMLElement>;
}) => {
  console.log(item);

  console.log(item.item.id);
  return (
    <div
      onClick={onClick}
      className={`w-full sm:w-[95%] transform transition duration-500 ease-in-out hover:scale-105 ${className}`}
    >
      <img
        className="w-full h-40 object-cover"
        src={item.item.pictureUrl[0]}
        alt={item.item.title}
      />
      <div className="px-4 py-2">
        <div className="font-bold text-lg mb-2">{item.item.title}</div>
        <p className="text-gray-700 text-sm">{item.item.description}</p>
        <p className="text-gray-700 text-sm flex gap-2 items-center">
          <MapPin size={18} /> {item.item.itemStatus}
        </p>
        <div className="flex items-center justify-around">
          <p className="text-gray-700 font-semibold">
            Rate: Rs. {item.item.rate} /day
          </p>
          <Button
            className="font-bold py-1 px-2 rounded "
            disabled={
              item.item.itemStatus === "inrent" ||
              item.item.itemStatus === "unavailable"
            }
          >
            Rent Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
