import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import PageNotFound from "./Pages/PageNotFound"
import DashboardLoading from "./components/DashboardLoading"
import ProtectedRoute from "./components/Auth/ProtectedRoute"


const SelectTemplate = lazy(() => import("./Pages/SelectTemplate"))
const AddCatalogue = lazy(() => import("./Pages/AddCatalogue"))
const AllCatalogue = lazy(() => import("./Pages/AllCatalogue"))
const EditCatalogue = lazy(() => import("./Pages/EditCatalogue"))
const RecycledCatalogue = lazy(() => import("./Pages/RecycledCatalogue"))

const Template1 = lazy(() => import("./Templates/Portfolio/templatePages/Template1"))
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
          <Route path="/add-portfolio/:template" element={<AddPortfolio />} />
          <Route path="/add-catalogue" element={<AddCatalogue />} />
          <Route path="/all-portfolio" element={<AllPortfolio />} />
          <Route path="/all-catalogue" element={<AllCatalogue />} />
          <Route path="/edit-portfolio/:username" element={<EditPortfolio />} />
          <Route path="/edit-catalogue/:username" element={<EditCatalogue />} />
          <Route path="/portfolio-recycle-bin" element={<RecycledPortfolio />} />
          <Route path="/catalogue-recycle-bin" element={<RecycledCatalogue />} />
          <Route path="/select-template" element={<SelectTemplate />} />
          <Route path="/portfolio/preview/template1/:username" element={<Template1 />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App

