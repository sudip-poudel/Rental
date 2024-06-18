import sampleItems from "@/sampleData/itemSamples";
import Card from "./ui/card";

const Items = () => {
  return (
    <div className="mt-12 grid place-content-center place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {sampleItems.map((item) => (
        <Card
          className="rounded-lg shadow-md overflow-hidden "
          item={item}
          key={item.id}
        />
      ))}
    </div>
  );
};

export default Items;
