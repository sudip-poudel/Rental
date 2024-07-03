import React, { useState, useRef } from "react";
import { PenIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/types/types";
import AvatarImageCrop from "@/components/AvatarImageCrop";

type User = {
  name: string;
  email: string;
  age: number;
};

const UserProfile = () => {
  const state = useSelector((state: RootState) => state.auth.userInfo);
  console.log(state);

  const originalUserData = {
    name: state.name,
    email: state.email,
    age: 30,
  }; // Original user data for comparison
  const [user, setUser] = useState<User>(originalUserData);
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const inputRefs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    age: useRef<HTMLInputElement>(null),
  };

  const handleUpdate = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof User
  ) => {
    setUser({ ...user, [field]: e.target.value });
  };

  const toggleEdit = (field: keyof User) => {
    setEditMode({ ...editMode, [field]: !editMode[field] });
    if (!editMode[field]) {
      setTimeout(() => inputRefs[field].current?.focus(), 0); // Focus after the state update
    }
  };

  const hasChanges = () => {
    return Object.entries(originalUserData).some(
      ([key, value]) => user[key as keyof User] !== value
    );
  };

  const updateUserData = () => {
    console.log("Updating user data...");
    // Here, you would typically send the updated data to your backend or perform some action with it
    // For demonstration, we're just logging to the console
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h1 className="text-xl font-bold">Users Profile</h1>
      <div className="flex flex-col md:flex-row items-center justify-around w-full">
        <AvatarImageCrop />

        <div className="w-3/5 bg-white rounded-lg border border-gray-200 shadow-md p-4 ">
          <h2 className="text-lg font-semibold text-gray-900">
            {originalUserData.name.charAt(0).toUpperCase() +
              originalUserData.name.slice(1)}
          </h2>
          <div className="space-y-3 mt-4">
            {Object.entries(user).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                {editMode[key] ? (
                  <input
                    ref={inputRefs[key]}
                    type={key === "age" ? "number" : "text"}
                    name={key}
                    value={value.toString()}
                    onChange={(e) => handleUpdate(e, key as keyof User)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    onBlur={() => toggleEdit(key as keyof User)}
                  />
                ) : (
                  <>
                    <span className="text-sm text-gray-600">{`${
                      key.charAt(0).toUpperCase() + key.slice(1)
                    }: ${value}`}</span>
                    <PenIcon
                      className="h-5 w-5 text-gray-500 cursor-pointer"
                      onClick={() => toggleEdit(key as keyof User)}
                    />
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
  );
};

export default UserProfile;
