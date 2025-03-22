import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import PageNotFound from "./Pages/PageNotFound"
import DashboardLoading from "./components/DashboardLoading"
import ProtectedRoute from "./components/Auth/ProtectedRoute"
import Template1 from "./Templates/Portfolio/templatePages/Template1"
import SelectTemplate from "./Pages/SelectTemplate"
import AddCatalogue from "./Pages/AddCatalogue"
import AllCatalogue from "./Pages/AllCatalogue"
import EditCatalogue from "./Pages/EditCatalogue"

const Dashboard = lazy(() => import("./Pages/Dashboard"))
const AddPortfolio = lazy(() => import("./Pages/AddPortfolio"))
const AllPortfolio = lazy(() => import("./Pages/AllPortfolio"))
const EditPortfolio = lazy(() => import("./Pages/EditPortfolio"))
const RecycledPortfolio = lazy(() => import("./Pages/RecycledPortfolio"))
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

