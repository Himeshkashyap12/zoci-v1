import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center pt-10 px-4">
      <h1 className="text-8xl font-bold text-[#214344]">404</h1>
      <p className="text-2xl text-gray-600 mt-2">Oops! Page not found.</p>
      <p className="text-lg text-gray-500">The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/">
        <Button  className="mt-6 bg-[#214344] hover:!bg-[#214344] text-[#fff]  hover:!text-[#fff] !border-none rounded-full">
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
