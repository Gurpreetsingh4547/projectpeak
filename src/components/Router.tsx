import { BrowserRouter, Routes, Route } from "react-router-dom";

// Compoenents
import LoginForm from "../components/Login/LoginForm";
import Signup from "./Signup/Signup";
import Auth from "./Auth";
import VerifyUser from "./VerifyUser/VerifyUser";
import Dashboard from "./Dashboard/Dashboard";
import ProjectLisiting from "./Projects/ProjectLisiting";
import UsersListing from "./Users/UsersListing";
import ForgetPassword from "./ForgetPassword/ForgetPassword";

/**
 * The ProtectRouter component wraps the application's routes
 * and ensures that the user is logged in before allowing access
 * to protected routes
 */
export const ProtectRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Auth>
              <Dashboard />
            </Auth>
          }
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<VerifyUser />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />

        <Route
          path="/projects"
          element={
            <Auth>
              <ProjectLisiting />
            </Auth>
          }
        />

        <Route
          path="/users"
          element={
            <Auth>
              <UsersListing />
            </Auth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
