// Packages
import { Toaster } from "@/components/ui/sonner";
import { Provider } from "react-redux";

// Components
import { ProtectRouter } from "./components/Router";

// Redux Store
import store from "./redux/Store";

/**
 * Main component of the App
 */
const App = () => (
  <Provider store={store}>
    <ProtectRouter />
    <Toaster />
  </Provider>
);

export default App;
