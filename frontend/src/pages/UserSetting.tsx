import React, { useState, useRef, useEffect } from "react";
import { PenIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IUserDetails, IUserProfileDetails } from "@/types/types";
import AvatarImageCrop from "@/components/AvatarImageCrop";
import { useGetCurrentUserDetails } from "@/api/userQueriesAndMutation";

const UserSetting = () => {
  const { data: currentUserData, isLoading: isUserDetailsLoading } =
    useGetCurrentUserDetails();
  // const originalUserData = currentUserData; // Original user data for comparison
  const [user, setUser] = useState<IUserProfileDetails>();
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const inputRefs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    role: useRef<HTMLInputElement>(null),
    created_at: useRef<HTMLInputElement>(null),
  };
  useEffect(() => {
    if (currentUserData)
      setUser({
        name: currentUserData.name,
        email: currentUserData.email,
        role: currentUserData.role,
        created_at: currentUserData.created_at,
      });
  }, [currentUserData]);
  if (!currentUserData || isUserDetailsLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <img src="/images/loaderBlack.svg" alt="loading.." />
      </div>
    );
  }

  const handleUpdate = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof IUserDetails
  ) => {
    user && setUser({ ...user, [field]: e.target.value });
  };

  const toggleEdit = (field: keyof IUserDetails) => {
    setEditMode({ ...editMode, [field]: !editMode[field] });
    if (!editMode[field]) {
      setTimeout(() => inputRefs[field].current?.focus(), 0); // Focus after the state update
    }
  };

  const hasChanges = () => {
    return Object.entries(currentUserData).some(
      ([key, value]) => user && user[key as keyof IUserDetails] !== value
    );
  };

  const updateUserData = () => {
    console.log("Updating user data...");
    // Here, you would typically send the updated data to your backend or perform some action with it
    // For demonstration, we're just logging to the console
  };
  const userProfileUrl = currentUserData?.profileUrl as string;

  return (
    user && (
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="text-xl font-bold">Users Profile</h1>
        <div className="flex flex-col md:flex-row items-center justify-around w-full">
          <AvatarImageCrop userProfileUrl={userProfileUrl} />

          <div className="w-3/5 bg-white rounded-lg border border-gray-200 shadow-md p-4 ">
            <h2 className="text-lg font-semibold text-gray-900">
              {currentUserData &&
                currentUserData.name.charAt(0).toUpperCase() +
                  currentUserData.name.slice(1)}
            </h2>
            <div className="space-y-3 mt-4">
              {Object.entries(user).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  {key === "name" ? (
                    editMode[key] ? (
                      <input
                        ref={inputRefs[key]}
                        type={"text"}
                        name={key}
                        value={value.toString()}
                        onChange={(e) =>
                          handleUpdate(e, key as keyof IUserDetails)
                        }
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        onBlur={() => toggleEdit(key as keyof IUserDetails)}
                      />
                    ) : (
                      <>
                        <span
                          className="cursor-pointer text-sm text-gray-600"
                          onClick={() => toggleEdit(key)}
                        >
                          Name: {value.toString()}
                        </span>
                        <PenIcon
                          className="h-5 w-5 text-gray-500 cursor-pointer"
                          onClick={() => toggleEdit(key)}
                        />
                      </>
                    )
                  ) : (
                    <>
                      <span className="text-sm text-gray-600">{`${
                        key === "created_at"
                          ? "Member Since"
                          : key.charAt(0).toUpperCase() + key.slice(1)
                      }: ${
                        key === "created_at"
                          ? new Date(value).toLocaleDateString("en-Us")
                          : value
                      }`}</span>
                    </>
                  )}
                </div>
              ))}
              <Button
                className={`mt-4 px-4 py-2 text-white rounded-md ${
                  !hasChanges() && "opacity-50 cursor-not-allowed"
                }`}
                disabled={!hasChanges()}
                onClick={updateUserData}
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UserSetting;
