// Packages
import { ReactNode } from "react";
import { node } from "prop-types";
import { Navigate } from "react-router-dom";

// Comonents
import NavigationBar from "./common/NavigationMenu";
import { Sidebar } from "./common/Sidebar";

// Services
import LocalStorageUtil from "@/service/localStorage";
import { HaveValue, IsTrue } from "@/service/helper";

// Interface
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
  if (!HaveValue(currentLoginUser?._id)) {
    isLoggedIn = false;
  }

  /**
   * If the user is not verified, redirect to the verify route
   */
  if (
    !IsTrue(currentLoginUser?.verified, false) &&
    HaveValue(currentLoginUser?._id)
  ) {
    return <Navigate to="/verify" />;
  }

  /**
   * If the user is not logged in, redirect to the login route
   */
  if (!IsTrue(isLoggedIn, false)) {
    return <Navigate to="/login" />;
  }

  /**
   * Otherwise return the wrapped component
   */
  return (
    <>
      <NavigationBar />
      <div className="flex justify-between">
        <Sidebar className="hidden lg:block" />
        <div className="m-5 w-full">{children}</div>
      </div>
    </>
  );
};

/**
 * Components Prop Types
 */
Auth.propTypes = {
  children: node.isRequired,
};

export default Auth;
