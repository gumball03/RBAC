import { Navigate, useLocation } from "react-router-dom"; 
import PropTypes from 'prop-types'; 
import { useEffect, useState } from 'react';
import LoadingSpinner from "../components/loader/loadingSpinner";

const ProtectedRoute = ({ children, roles }) => { 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const authToken = localStorage.getItem("authToken"); 
  const userRole = localStorage.getItem("userRole") 
    ? JSON.parse(localStorage.getItem("userRole")) 
    : null;
  const location = useLocation(); 

  useEffect(() => {
    const checkAuth = () => {
      if (authToken) {
        if (!roles || (userRole && roles.includes(userRole))) {
          setIsAuthenticated(true);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [authToken, userRole, roles]);

  if (isLoading) {
    return <LoadingSpinner />; 
  }

  if (!isAuthenticated) { 
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }} 
        replace 
      />
    ); 
  } 

  return children; 
}; 

ProtectedRoute.propTypes = { 
  children: PropTypes.node.isRequired, 
  roles: PropTypes.arrayOf(PropTypes.string), 
}; 

export default ProtectedRoute;