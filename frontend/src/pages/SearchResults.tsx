import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import { SearchResultItem } from "@/types/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Card from "@/components/ui/card";

const SearchResults = () => {
  const { searchterm } = useParams<{ searchterm: string }>(); // Correct typing for useParams
  console.log(searchterm);

  const [searchResult, setSearchResult] = useState<SearchResultItem[]>([]); // Use correct type for searchResult
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchterm) {
      const fetchItem = async () => {
        setIsLoading(true); // Set loading state to true before starting the fetch
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
          } else {
            setSearchResult([]);
            // Handle case where there are no results
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false); // Set loading state to false after the fetch completes
        }
      };
      fetchItem();
    }
  }, [searchterm]); // Add searchterm to dependency array

  console.log(isLoading);
  
  const handleCard = (id) => {
    console.log("card clicked");
    console.log(id);
    // Navigate to the item page using the id
  };

  return (
    <>
      <Navbar />
      <div className="h-screen flex justify-center items-center">
        {" "}
        {isLoading ? (
          <div>Loading...</div>
        ) : searchResult.length > 0 ? (
          searchResult.map((item,i) => (
            // Assuming item has 'id' and 'title' properties
            <Card onClick={handleCard.bind(this, item.id)}
            className="rounded-lg shadow-md overflow-hidden "
            item={item}
            key={i}/>
          ))
        ) : (
          <div>There is no such item for rent</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;
