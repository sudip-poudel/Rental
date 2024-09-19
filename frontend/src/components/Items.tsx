import { useState } from "react";
import Card from "./ui/card";
import { useNavigate } from "react-router-dom";
import { useGetCategories, useGetItems } from "@/api/itemsQueriesAndMutation";

const Items = () => {
  const navigate = useNavigate();
  const { data: items, isLoading } = useGetItems();
  const { data: categories } = useGetCategories();
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCard = (id) => {
    navigate(`/itempage/${id}`, { replace: true, preventScrollReset: true });
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredItems = selectedCategory
    ? items?.filter((item) => item.item.category === selectedCategory)
    : items;

  return (
    <>
      <div className="flex justify-start items-center mt-6 gap-3 ml-8">
        <p className="font-bold ">Filter Options:</p>

        <div className="">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Categories</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {!isLoading ? (
        <div className="mt-12 grid place-content-center place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {filteredItems?.map((item, i) => (
            <Card
              onClick={handleCard.bind(this, item.item.id)}
              className="rounded-lg shadow-md overflow-hidden"
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
