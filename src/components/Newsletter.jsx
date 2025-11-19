import React, { useState } from "react";
import { db } from "../firebase/firebase.config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.3 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      setLoading(true);
      await addDoc(collection(db, "subscribers"), {
        email: email,
        createdAt: Timestamp.now(),
      });

      toast.success("Subscribed successfully!", {
        position: "top-center",
        autoClose: 3000, 
        theme: "colored",
      });

      setEmail("");
      setSubscribed(true);
    } catch (error) {
      console.error("Error adding subscriber:", error);
      toast.error("Something went wrong! Please try again.", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      className="bg-gradient-to-br from-gray-900 via-blue-900 to-white text-white py-26 px-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2 className="text-3xl md:text-4xl font-bold mb-4" variants={childVariants}>
          Subscribe to Our Newsletter
        </motion.h2>

        <motion.p className="text-gray-300 mb-8" variants={childVariants}>
          Get the latest updates on new games, exclusive offers, and news from{" "}
          <span className="text-purple-400 font-semibold">GameHub</span>.
        </motion.p>

        <AnimatePresence>
          {!subscribed ? (
            <motion.form
              key="form"
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row justify-center items-center gap-4"
              variants={childVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-2/3 px-5 py-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                disabled={loading}
              />
              <button
                type="submit"
                className="px-6 py-3 rounded bg-[#D72050] hover:bg-[#b60534] font-semibold"
                disabled={loading}
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </motion.form>
          ) : (
            <motion.p
              key="thankyou"
              className="text-lg text-green-400 font-semibold mt-4"
              variants={childVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              🎉 Thank you for subscribing!
            </motion.p>
          )}
        </AnimatePresence>

        <motion.p className="text-sm text-white mt-6" variants={childVariants}>
          We respect your privacy — unsubscribe anytime.
        </motion.p>
      </div>

    </motion.section>
  );
};

export default Newsletter;
