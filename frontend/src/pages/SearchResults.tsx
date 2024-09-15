import { useSearchItems } from "@/api/itemsQueriesAndMutation";
import { useParams } from "react-router-dom";

const SearchResults = () => {
  const { searchterm } = useParams<{ searchterm: string }>(); // Correct typing for useParams
  console.log(searchterm);
  const { data: searchResult } = useSearchItems(searchterm as string);

  console.log(searchResult);

  if (!searchResult) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        {searchResult.length > 0 ? (
          searchResult.map((item) => (
            // Assuming item has 'id' and 'title' properties
            <div key={item.id}>{item.title}</div>
          ))
        ) : (
          <div>There is no such item for rent</div>
        )}
      </div>
    </>
  );
};

export default SearchResults;
