import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { user,  } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return <p className="text-center mt-10">Please log in to see your profile.</p>;


  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <img
        src={user.photoURL || "https://via.placeholder.com/150"}
        alt={user.displayName || "User"}
        className="w-32 h-32 rounded-full mb-4"
      />
      <h2 className="text-2xl font-bold">{user.displayName}</h2>
      <p className="text-gray-600">{user.email}</p>
      <button
  onClick={() => navigate("/auth/update-profile")}
  className="bg-[#D72050] hover:bg-[#b60534] text-white px-6 py-2 rounded-md font-semibold"
>
  Update Information
</button>

    </div>
  );
};

export default Profile;
