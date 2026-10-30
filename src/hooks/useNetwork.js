import { useState, useEffect } from "react";
import { sileo } from "sileo";

const useNetwork = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      sileo.success({
        title: "Back online",
        fill: "#FF5617",
        roundness: 12,
        description: "Your internet connection has been restored.",
        styles: {
          title: "text-white!",
          description: "text-white/80!",
          badge: "bg-white/40!",
        },
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      sileo.error({
        title: "You're offline",
        fill: "#FF5617",
        roundness: 12,
        description: "Your internet connection has been lost.",
        styles: {
          title: "text-white!",
          description: "text-white/80!",
          badge: "bg-white/40!",
        },
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
};

export default useNetwork;
