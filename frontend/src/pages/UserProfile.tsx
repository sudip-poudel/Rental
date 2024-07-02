import React, { useState, useRef, useEffect } from "react";
import { PenIcon } from "lucide-react";

type User = {
  name: string;
  email: string;
  age: number;
};

const UserProfile = () => {
  const originalUserData = {
    name: "John Doe",
    email: "john@example.com",
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
    <div className="max-w-md mx-auto bg-white rounded-lg border border-gray-200 shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-900">User Profile</h2>
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
        <button
          className={`mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md ${
            !hasChanges() && "opacity-50 cursor-not-allowed"
          }`}
          disabled={!hasChanges()}
          onClick={updateUserData}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
