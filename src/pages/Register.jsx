import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";

const Registration = () => {
  const { createUser, setUser, updateUser } = useContext(AuthContext);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  // Password validation
  const validatePassword = (password) => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return false;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter");
      return false;
    } else if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const photo = form.photo.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();

    // Name validation
    if (name.length < 5) {
      setNameError("Name should be more than 5 characters");
      return;
    } else {
      setNameError("");
    }

    // Password validation
    if (!validatePassword(password)) {
      return;
    }

    // Firebase email-password registration
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            toast.success("Registration successful!", {
              position: "top-center",
              autoClose: 3000,
            });
            navigate("/");
          })
          .catch((err) => {
            console.error(err);
            setUser(user);
          });
      })
      .catch((error) => {
        toast.error(`Registration failed: ${error.message}`, {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  //  Google registration/login
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        toast.success(`Welcome, ${user.displayName || "User"}!`, {
          position: "top-center",
          autoClose: 3000,
        });
        navigate("/");
      })
      .catch((err) => {
        toast.error(`Google login failed: ${err.message}`, {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-50">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5">
        <h2 className="font-semibold text-2xl text-center">Register your account</h2>

        <form onSubmit={handleRegistration} className="card-body">
          {/* Name */}
          <label className="label">Name</label>
          <input name="name" type="text" className="input" placeholder="Full Name" required />
          {nameError && <p className="text-xs text-error">{nameError}</p>}

          {/* Photo URL */}
          <label className="label">Photo URL</label>
          <input name="photo" type="text" className="input" placeholder="Photo URL" required />

          {/* Email */}
          <label className="label">Email</label>
          <input name="email" type="email" className="input" placeholder="Email" required />

          {/* Password */}
          <label className="label">Password</label>
          <input name="password" type="password" className="input" placeholder="Password" required />
          {passwordError && <p className="text-xs text-error">{passwordError}</p>}

          <button type="submit" className="btn btn-neutral mt-4">Register</button>
            <button
              onClick={handleGoogleLogin}
              className="btn bg-[#D72050] hover:bg-[#b60534] text-white  mt-3 "
            >
            <FcGoogle /> Continue with Google
          </button>
        </form>

        <p className="font-semibold text-center pt-2">
          Already have an account?{" "}
          <Link className="text-secondary" to="/auth/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
