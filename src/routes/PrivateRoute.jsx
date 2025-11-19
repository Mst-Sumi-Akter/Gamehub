import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (user) {
    return children;
  }

 
 return <Navigate to="/auth/login" state={{ from: location }} replace />;

};

export default PrivateRoute;
