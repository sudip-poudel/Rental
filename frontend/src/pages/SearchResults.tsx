import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import { SearchResultItem } from "@/types/types";


const SearchResults = () => {
  const { searchterm } = useParams();
  console.log(searchterm);

  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchterm) {

   
      const fetchItem = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/item/search/${searchterm}`,
            {
              withCredentials: true,
            }
          );
          const responsData = response.data;
          console.log(responsData);
          if (response.data.length > 0) {
            setSearchResult(responsData);
          }
        
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchItem();
    }
  }, [searchterm]);
  0;

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <h1>This is Search Result page:</h1>
          {searchResult.map((item:SearchResultItem, idx) => (
            <div key={idx}>{item.title}</div>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchResults;
