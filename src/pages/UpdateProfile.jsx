import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { getAuth, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });

      await auth.currentUser.reload(); 


      const toastId = toast.success("Profile updated successfully!", {
        position: "top-center",
        autoClose: 3000, 
      });

     
      setTimeout(() => {
        navigate("/");
      }, 3000);

    } catch (error) {
      toast.error(`${error.message}`, { position: "top-center", autoClose: 3000 });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-6 px-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Update Your Information</h2>
        <form onSubmit={handleUpdate}>
          <label className="label">Full Name</label>
          <input
            type="text"
            className="input input-bordered w-full mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
          <label className="label">Photo URL</label>
          <input
            type="text"
            className="input input-bordered w-full mb-6"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            placeholder="Enter your photo URL"
          />
          <button type="submit" className="btn bg-[#D72050] hover:bg-[#b60534] text-white w-full">
            Update Information
          </button>
        </form>
        <button onClick={() => navigate("/")} className="btn btn-outline w-full mt-3">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;
