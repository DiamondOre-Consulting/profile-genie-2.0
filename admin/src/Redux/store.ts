import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from './Slice/AuthSlice';
import { portfolioApi } from './API/PortfolioApi';

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        [portfolioApi.reducerPath]: portfolioApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            portfolioApi.middleware
        )
});

export default store;