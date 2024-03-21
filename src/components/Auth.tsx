import LocalStorageUtil from "@/service/localStorage";
import { node } from "prop-types";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AuthInterface {
  children: ReactNode;
}

/**
 * The Auth component wraps a route and redirects to the login route
 * if the user is not logged in
 */
const Auth = ({ children }: AuthInterface): React.ReactNode => {
  // Current Login User
  const currentLoginUser = LocalStorageUtil.getObject("USER");

  /**
   * Determines if the user is logged in
   */
  let isLoggedIn = true;

  /**
   * If the user is not logged in, redirect to the login route
   */
  if (!currentLoginUser?._id) {
    isLoggedIn = false;
  }

  /**
   * If the user is not verified, redirect to the verify route
   */
  if (!currentLoginUser?.verified && currentLoginUser?._id) {
    return <Navigate to="/verify" />;
  }

  /**
   * If the user is not logged in, redirect to the login route
   */
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  /**
   * Otherwise return the wrapped component
   */
  return children;
};

/**
 * Components Prop Types
 */
Auth.propTypes = {
  children: node.isRequired,
};

export default Auth;
