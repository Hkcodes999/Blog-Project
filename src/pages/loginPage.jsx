import React, { useEffect } from "react";
import Login from "../components/common/login";

const LoginPage = () => {
  useEffect(() => {
    window.lenis?.scrollTo(0, { immediate: true });
  });

  return (
    <div className="h-[90vh] w-full flex items-center justify-center z-10 overflow-hidden">
      <Login />
    </div>
  );
};

export default LoginPage;
