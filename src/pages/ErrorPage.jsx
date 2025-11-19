import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-white text-white text-center px-6">
     
       <h1 className="font-bold text-3xl p-3"> 404 Oops! Page Not Found</h1>
       <p className="pt-3"> The page you’re looking for doesn’t exist or may have been moved.</p>
      

        <div className="pt-5">
            <Link
          to="/"
          className="px-6  py-3 bg-[#D72050] hover:bg-[#b60534] rounded-lg text-white font-semibold shadow-md transition"
        >
           Back to Home
        </Link>
        </div>
      
    </div>
  );
};

export default ErrorPage;
