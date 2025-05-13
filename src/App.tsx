
import { AppProviders } from "./components/core/AppProviders";
import { AppRoutes } from "./components/core/AppRoutes";
import { AnimatePresence } from "framer-motion";
import './index.css';

function App() {
  return (
    <AppProviders>
      <AnimatePresence mode="wait">
        <AppRoutes />
      </AnimatePresence>
    </AppProviders>
  );
}

export default App;
