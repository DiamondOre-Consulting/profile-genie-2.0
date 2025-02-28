import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { profile } from "../../Redux/Slice/AuthSlice";
import DashboardLoading from "../DashboardLoading";


const ProtectedRoute = () => {
    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await dispatch(profile() as any);
                console.log(res)
                if (res?.payload?.success) {
                    setIsLoggedIn(true)
                } else {
                    setIsLoggedIn(false)
                }
            } catch (error) {
                console.log(1)
                return
            }
        };

        fetchData();

    }, [dispatch, isLoggedIn, location.pathname]);

    if (isLoggedIn === null) {
        return <DashboardLoading />
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;