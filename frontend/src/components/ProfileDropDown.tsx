import { logoutUser } from "@/api/userApi";
import { logout } from "@/store/auth/authSlice";
import { LogOut, Settings, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const ProfileDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const node = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e) => {
    if (node.current?.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleLogout = async (e) => {
    e.preventDefault();

    const response = await logoutUser();
    if (response.success) {
      dispatch(logout());
    }
  };

  return (
    <div className="relative" ref={node}>
      <button
        onClick={toggleOpen}
        className="rounded-full w-10 h-10 bg-gray-300 mr-8"
      >
        {/* Replace this with your profile icon */}P
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <Link to={"/profile"} className="flex items-center gap-2">
                <User width={20} />
                Profile
              </Link>
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <p className="flex items-center gap-2">
                <Settings width={20} />
                Settings
              </p>
            </a>
            <button
              onClick={handleLogout}
              className="block px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <p className="flex items-center gap-2">
                <LogOut width={20} />
                Logout
              </p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown;
