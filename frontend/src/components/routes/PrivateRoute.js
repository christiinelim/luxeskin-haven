import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = ({ Component, status }) => {
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext.isLoggedIn;
  const unauthorizedMessage = 'Unauthorized, please login to access';
  const loginURL = status === 'seller' ? '/seller/login' : '/login'

  return isAuthenticated ? <Component /> : <Navigate to={loginURL} state={{ error_message: unauthorizedMessage }} />;
};

export default PrivateRoute;
