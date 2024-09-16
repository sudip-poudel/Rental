import Card from "./ui/card";
import { useNavigate } from "react-router-dom";
import { useGetItems } from "@/api/itemsQueriesAndMutation";

const Items = () => {
  const navigate = useNavigate();
  const { data: items, isLoading } = useGetItems();

  const handleCard = (id) => {
    navigate(`/itempage/${id}`, { replace: true, preventScrollReset: true });
  };

  return (
    <>
      {!isLoading ? (
        <div className="mt-12 grid place-content-center place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {items?.map((item, i) => (
            <Card
              onClick={handleCard.bind(this, item.item.id)}
              className="rounded-lg shadow-md overflow-hidden "
              item={item}
              key={i}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-[20vh]">
          <img src="images/loaderBlack.svg" alt="Loading..." />
        </div>
      )}
    </>
  );
};

export default Items;
