import { BrowserRouter, Routes, Route } from "react-router-dom";

// Compoenents
import LoginForm from "../components/Login/LoginForm";
import Signup from "./Signup/Signup";
import Auth from "./Auth";
import VerifyUser from "./VerifyUser/VerifyUser";
import Dashboard from "./Dashboard/Dashboard";
import ProjectLisiting from "./Projects/ProjectLisiting";
import UserProfile from "./Users/UserProfile";
import ForgetPassword from "./ForgetPassword/ForgetPassword";
import ChangePassword from "./ForgetPassword/ChangePassword";

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
        <Route path="/verify/token/:token" element={<ChangePassword />} />

        <Route
          path="/projects"
          element={
            <Auth>
              <ProjectLisiting />
            </Auth>
          }
        />

        <Route
          path="/profile"
          element={
            <Auth>
              <UserProfile />
            </Auth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
