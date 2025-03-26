import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import PageNotFound from "./Pages/PageNotFound"
import DashboardLoading from "./components/DashboardLoading"
import ProtectedRoute from "./components/Auth/ProtectedRoute"
import EditCatalogue from "./Pages/EditCatalogue"

const Dashboard = lazy(() => import("./Pages/Dashboard"))
const Login = lazy(() => import("./Pages/Auth/Login"))

function App() {

  return (
    <Suspense fallback={<DashboardLoading />}>
      <Routes>
        <Route path="/login" element={<Login />} />
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

