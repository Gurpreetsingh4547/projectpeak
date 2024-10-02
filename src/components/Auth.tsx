// Packages
import { ReactNode, useEffect, useState } from "react";
import { node } from "prop-types";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { faClose, faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

// Comonents
import NavigationBar from "./common/NavigationMenu";
import { Sidebar } from "./common/Sidebar";
import { Button } from "./ui/button";

// Services
import LocalStorageUtil from "@/service/localStorage";
import { HaveValue, IsTrue } from "@/service/helper";
import { fetchProjects } from "@/redux/Reducers/Project";
import { AppDispatch } from "@/redux/Store";

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
  const dispatch = useDispatch<AppDispatch>();

  const [toggleSidebar, setToggleSidebar] = useState(false);

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

  useEffect(() => {
    dispatch(fetchProjects({}));
  }, [dispatch]);

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
      <div className="flex justify-between overflow-y-clip">
        <Sidebar
          className={`${
            IsTrue(toggleSidebar, false)
              ? "absolute w-64 bg-white shadow-lg transform transition-transform translate-x-0 z-40"
              : "hidden"
          } lg:block h-[100vh]`}
          toggleSidebar={() => setToggleSidebar(false)}
        />
        <Button
          className="lg:hidden fixed w-5 h-8 rounded-br-3xl z-50"
          variant="outline"
          title={IsTrue(toggleSidebar, false) ? "Close" : "Open"}
          onClick={() => setToggleSidebar(!toggleSidebar)}
        >
          <FontAwesomeIcon
            icon={
              IsTrue(toggleSidebar, false)
                ? (faClose as IconProp)
                : (faSliders as IconProp)
            }
          />
        </Button>
        <div className="w-full m-5">{children}</div>
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
