import { useGetItemsListedByUser } from "@/api/itemsQueriesAndMutation";
import { useGetUserDetailsById } from "@/api/userQueriesAndMutation";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();
  const { data: userDetails, isLoading: isUserLoading } = useGetUserDetailsById(
    id as string
  );
  const { data: itemsListed, isLoading: listedItemsLoading } =
    useGetItemsListedByUser(id as string);

  if (isUserLoading || listedItemsLoading) {
    return (
      <div className="flex items-center justify-center w-full h-[70vh]">
        <img src="images/loaderBlack.svg" alt="Loading" />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mt-10">
      <div className="flex items-center mb-6">
        <img
          className="w-24 h-24 rounded-full mr-6"
          src={userDetails?.profileUrl as string}
          alt="User Avatar"
        />
        <div>
          <h2 className="text-2xl font-bold">{userDetails?.name}</h2>
          <div className="flex items-center mt-2">
            <span className="text-yellow-500 mr-2">★</span>
            <span className="text-gray-700">{userDetails?.rating} / 5</span>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold">About Me</h3>
        <p className="text-gray-700">{"No information available."}</p>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Contact Information</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>Email: {userDetails?.email}</li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Items Listed:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {itemsListed?.map((item) => (
            <div
              key={item.item.id}
              className="bg-gray-100 p-4 rounded-lg shadow-md"
            >
              <img
                className="w-full h-32 object-cover rounded-md mb-2"
                src={item.item.pictureUrl[0]}
                alt={item.item.title}
              />
              <h4 className="text-md font-semibold">{item.item.title}</h4>
              <p className="text-gray-600">{item.item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
