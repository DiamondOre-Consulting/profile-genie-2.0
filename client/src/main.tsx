import { createRoot, hydrateRoot } from "react-dom/client";
import "./app.css";
import "./styles/template1.css";
import "./styles/template2.css";

import App, { type SsrPageData } from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store.ts";
import { Toaster } from "sonner";
import SmoothScrollProvider from "./components/SmoothScrollProvider.tsx";

declare global {
  interface Window {
    __SSR_PAGE_DATA__?: SsrPageData;
    __SSR_RENDERED__?: boolean;
  }
}

const root = document.getElementById("root")!;
const app =
  <Provider store={store}>
    <BrowserRouter>
      <SmoothScrollProvider>
        <App ssrPageData={window.__SSR_PAGE_DATA__} />
      </SmoothScrollProvider>
      <Toaster
        richColors
        toastOptions={{ duration: 2000 }}
        position="bottom-right"
      />
    </BrowserRouter>
  </Provider>
;

if (window.__SSR_RENDERED__) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
