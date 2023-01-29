import React from 'react';
import { Navigate , Outlet } from 'react-router-dom';

const RedirectRoute = ({ isAllowed, redirectPath, children }) => {
  if(isAllowed && children) {
    return children;
  }
  if(isAllowed && !children) {
    return <Outlet />;
  }
  return (
    <Navigate to={redirectPath} replace />
  );
};

export default RedirectRoute;
