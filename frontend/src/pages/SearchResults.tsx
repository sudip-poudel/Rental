import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import { SearchResultItem } from "@/types/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
            setSearchResult([]); // Handle case where there are no results
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

  return (
    <>
      <Navbar />
      <div className="h-screen flex justify-center items-center">
        {" "}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          searchResult.map((item: SearchResultItem) => (
            <div key={item.id}>{item.title}</div> // Assuming item has 'id' and 'name' properties
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;
