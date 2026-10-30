import React from "react";
import { useSelector } from "react-redux";
import service from "../../appwrite/confg";

const Profile = ({ size = 40 }) => {
  const userData = useSelector((state) => state.auth.userData);
  const previewProfile = userData?.prefs?.avatar
    ? service.getFilePreview(userData.prefs.avatar)
    : null;

  const initials = userData?.name
    ? userData.name
        .trim()
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="relative">
      <div
        style={{ height: `${size}px`, width: `${size}px` }}
        className="rounded-full overflow-hidden flex items-center justify-center  text-white shadow-sm ring-2 ring-white/80 transition-transform duration-200"
      >
        {previewProfile ? (
          <img
            src={previewProfile}
            alt="profile"
            className="h-full w-full object-cover"
          />
        ) : (
          <span
            className="font-semibold select-none font-[font1] bg-[#FF6F3A]"
            style={{ fontSize: `${Math.max(12, Math.round(size * 0.35))}px` }}
          >
            {initials}
          </span>
        )}
      </div>
    </div>
  );
};

export default Profile;
