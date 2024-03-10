import { BrowserRouter, Routes, Route } from "react-router-dom";

// Compoenents
import LoginForm from "../components/Login/LoginForm";
import Signup from "./Signup/Signup";
import Auth from "./Auth";

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
              <div>hello</div>
            </Auth>
          }
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};
