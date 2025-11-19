import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";


const Login = () => {
  const [error, setError] = useState("");
  const { signIn, setUser } = useContext(AuthContext); 
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth(); // Firebase auth instance
  

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        toast.success(`Welcome back, ${user.displayName || "User"}!`, {
          position: "top-center",
          autoClose: 3000,
        });
       navigate(location?.state?.from?.pathname || "/", { replace: true });
      })
      .catch((err) => {
        setError(err.code);
        toast.error(`Login failed: ${err.message}`, {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  // Google login handler
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
         setUser(user);
        toast.success(`Welcome, ${user.displayName || "User"}!`, {
          position: "top-center",
          autoClose: 3000,
        });
        navigate(location.state?.from || "/");
      })
      .catch((err) => {
        toast.error(`Google login failed: ${err.message}`, {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5">
        <h2 className="font-semibold text-2xl text-center">Login to your account</h2>

        <form onSubmit={handleLogin} className="card-body">
          <label className="label">Email</label>
          <input name="email" type="email" className="input" placeholder="Email" required />
          <label className="label">Password</label>
          <input name="password" type="password" className="input" placeholder="Password" required />

          {error && <p className="text-red-400 text-xs">{error}</p>}
          <p className="text-center mt-2">
          <Link to="/auth/forgot-password" className="text-blue-500 hover:underline">
          Forgot Password?
          </Link>
          </p>


          <button type="submit" className="btn btn-neutral mt-4">Login</button>
           <button
          onClick={handleGoogleLogin}
          className="btn bg-[#D72050] hover:bg-[#b60534] text-white  mt-3 "
        >
          <FcGoogle /> Login with Google
        </button>
        </form>

       

        <p className="font-semibold text-center pt-5">
          Don’t Have An Account?{" "}
          <Link className="text-secondary" to="/auth/registration">
            Registration
          </Link>
        </p>
      </div>
      
    </div>
  );
};

export default Login;
