import { useGetUserDetailsById } from "@/api/userQueriesAndMutation";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();
  const { data: userDetails, isLoading: isUserLoading } = useGetUserDetailsById(
    id as string
  );

  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center w-full h-[70vh]">
        <img src="images/loaderBlack.svg" alt="Loading" />
      </div>
    );
  }
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <img
          className="w-12 h-12 rounded-full mr-4"
          src={userDetails?.profileUrl as string}
          alt="User Avatar"
        />
        <h2 className="text-xl font-bold">{userDetails?.name}</h2>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">About Me</h3>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          fringilla, nisl id consectetur tincidunt, ligula mauris consequat
          elit, non tincidunt nunc nunc id mauris.
        </p>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Contact Information</h3>
        <ul className="list-disc list-inside">
          <li>Email: john.doe@example.com</li>
          <li>Phone: +1 123 456 7890</li>
          <li>Address: 123 Main St, City, Country</li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
