import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import PageNotFound from "./Pages/PageNotFound"
import DashboardLoading from "./components/DashboardLoading"
import ProtectedRoute from "./components/Auth/ProtectedRoute"
import EditCatalogue from "./Pages/EditCatalogue"
import ForgotPassword from "./Pages/Auth/ForgotPassword"
import ResetPassword from "./Pages/Auth/ResetPassword"

const Dashboard = lazy(() => import("./Pages/Dashboard"))
const Login = lazy(() => import("./Pages/Auth/Login"))

function App() {

  return (
    <Suspense fallback={<DashboardLoading />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path='/reset-password/:token/:email/:expiry' element={<ResetPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/catalogue/*" element={<EditCatalogue />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App

