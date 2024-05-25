import React from "react";
import { Navigate, RouteProps } from "react-router-dom";

type ProtectedRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
  Component: React.FC;
} & RouteProps;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  authenticationPath,
  Component,
}) => {
  if (isAuthenticated) {
    return <Component />;
  } else {
    return <Navigate to={authenticationPath} replace={true} />;
  }
};

export default ProtectedRoute;
