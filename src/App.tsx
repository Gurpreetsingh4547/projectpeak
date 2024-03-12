// Packages
import { Toaster } from "@/components/ui/sonner";

// Components
import { ProtectRouter } from "./components/Router";

/**
 * Main component of the App
 */
const App = () => (
  <>
    <ProtectRouter />
    <Toaster />
  </>
);

export default App;
