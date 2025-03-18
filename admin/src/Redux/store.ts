import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from './Slice/AuthSlice';
import { portfolioApi } from './API/PortfolioApi';
import { catalogueApi } from './API/CatalogueApi';

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        [portfolioApi.reducerPath]: portfolioApi.reducer,
        [catalogueApi.reducerPath]: catalogueApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            portfolioApi.middleware,
            catalogueApi.middleware
        )
});

export default store;