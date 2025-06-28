import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./Redux/store.ts";
import { Toaster } from "sonner";
import SmoothScrollProvider from "./components/SmoothScrollProvider.tsx";
import "react-phone-input-2/lib/style.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    {/* <SmoothScrollProvider> */}
    <App />
    {/* </SmoothScrollProvider> */}
    <Toaster
      richColors
      toastOptions={{ duration: 2000 }}
      position="bottom-right"
    />
  </Provider>
);
