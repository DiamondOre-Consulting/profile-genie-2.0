import { configureStore } from "@reduxjs/toolkit";
import { templateApi } from "./API/TemplateApi";

const store = configureStore({
  reducer: {
    [templateApi.reducerPath]: templateApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(templateApi.middleware),
});

export default store;
