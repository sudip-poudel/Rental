import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const SearchResults = () => {
  const { searcterm } = useParams();

  const [searchResult, setSearchResult] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/item/search/${searcterm}`,
          {
            withCredentials: true,
          }
        );

        console.log("this is response:", response);
        if (response.data) {
          console.log(`response data`, response.data);
          const searchedItems = response.data;
          setSearchResult(searchedItems);
          console.log(`search result`, searchResult);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItem();
  }, []);0

  return (
    <div>
      {searchResult.map((item, idx) =><div>{item.title}</div>)}
    </div>
  );
};

export default SearchResults;
