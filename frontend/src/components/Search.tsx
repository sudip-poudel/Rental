import blobpic1 from "/images/blobpic1.png";
import blobpic2 from "/images/blobpic2.png";
import { Button } from "./ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = ({ searchTerm }: { searchTerm?: string }) => {
  const [searchItem, setSearchItem] = useState(searchTerm || "");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchItem(e.target.value);
  };

  console.log("search item; ", searchItem);
  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/searchresults/${searchItem}`, {
      replace: true,
    });
  };

  return (
    <div className="flex flex-row items-center justify-center mt-7">
      <img
        className="object-fill h-44 w-44 mr-10 -mt-32 hidden sm:block"
        src={blobpic1}
        alt="blob"
      />
      <section className="flex flex-col">
        <p className="text-3xl font-extrabold flex flex-col sm:text-4xl md:text-5xl ">
          <span>Easily find and rent</span>
          <span>the perfect item for you.</span>
        </p>
        <div className="flex flex-row w-full mt-16 gap-5">
          <form
            onSubmit={handleSearchSubmit}
            className="w-full flex flex-row gap-1"
          >
            <input
              type="text"
              className="w-3/4 h-12 border-gray-400 border-[0.1px]  rounded-2xl pl-2"
              placeholder="Search for items..."
              value={searchItem}
              onChange={handleSearch}
              required
            />
            <Button type="submit" className="font-bold h-12 w-1/4 ">
              Search
            </Button>
          </form>
        </div>
      </section>
      <img
        className="object-fill h-40 w-40 ml-16 mt-10 hidden md:block"
        src={blobpic2}
        alt="blob"
      />
    </div>
  );
};

export default Search;
