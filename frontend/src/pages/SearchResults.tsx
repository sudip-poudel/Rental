import { useSearchItems } from "@/api/itemsQueriesAndMutation";
import Search from "@/components/Search";
import Card from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";

const SearchResults = () => {
  const { searchterm } = useParams<{ searchterm: string }>(); // Correct typing for useParams
  console.log(searchterm);
  const { data: searchResult } = useSearchItems(searchterm as string);
  const navigate = useNavigate();

  if (!searchResult) {
    return <div>Loading...</div>;
  }

  const handleCard = (id) => {
    navigate(`/itempage/${id}`, { replace: true, preventScrollReset: true });
  };

  return (
    <>
      <Search searchTerm={searchterm} />
      <div className="h-screen mt-12 grid place-content-start place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {searchResult.length > 0 ? (
          searchResult.map((item, i) => (
            <Card
              item={item}
              onClick={handleCard.bind(this, item.item.id)}
              key={i}
              className="rounded-lg shadow-md overflow-hidden "
            />
          ))
        ) : (
          <div>There is no such item for rent</div>
        )}
      </div>
    </>
  );
};

export default SearchResults;
