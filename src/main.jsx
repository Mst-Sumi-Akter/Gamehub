import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from "react-router-dom";
import router from './routes/router.jsx'
import AuthProvider from './provider/AuthProvider.jsx'
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById('root')).render(
  <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
         <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        limit={1}
      />

  </AuthProvider>

  
)
