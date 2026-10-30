import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authslice";
import authservice from "../../appwrite/auth";
import { LogOut } from "lucide-react";
import { sileo } from "sileo";

const Logoutbtn = () => {
  const dispatch = useDispatch();

  const handlelogout = () => {
    authservice.LogoutAccount().then(() => {
      setTimeout(() => {
        dispatch(logout());
        sileo.success({
          title: "Logged out",
          roundness: 9,
          fill: "#FF5617",
          styles: {
            title: "text-white!",
            description: "text-white/90!",
            badge: "bg-white/40!",
          },
        });
      }, 500);
    });
  };

  return (
    <button
      onClick={handlelogout}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-black/5 transition-colors duration-200 group"
    >
      <LogOut size={16} strokeWidth={1.5} className="text-red-400" />
      <span className="text-sm text-red-400 group-hover:text-red-500 transition-colors duration-200 font-medium">
        Logout
      </span>
    </button>
  );
};

export default Logoutbtn;
