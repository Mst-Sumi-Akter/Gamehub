import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const auth = getAuth();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.warn("Please enter your email!", { position: "top-center" });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success(" Password reset email sent! Check your inbox.", {
        position: "top-center",
        autoClose: 3000,
      });
      setEmail("");
    } catch (error) {
      console.error("Reset error:", error);
      toast.error(` ${error.message}`, { position: "top-center" });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5 px-6">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Reset Your Password
        </h2>
        <form onSubmit={handleResetPassword}>
          <label className="label">Email</label>
          <input
            type="email"
            className="input input-bordered w-full mb-4"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="btn bg-[#D72050] hover:bg-[#b60534] text-white w-full"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-500">
          We’ll send a password reset link to your email.
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
