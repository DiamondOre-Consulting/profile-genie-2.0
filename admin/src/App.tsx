import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import PageNotFound from "./Pages/PageNotFound"

const Dashboard = lazy(() => import("./Pages/Dashboard"))
const AddPortfolio = lazy(() => import("./Pages/AddPortfolio"))
const AllPortfolio = lazy(() => import("./Pages/AllPortfolio"))
const EditPortfolio = lazy(() => import("./Pages/EditPortfolio"))
const RecycledPortfolio = lazy(() => import("./Pages/RecycledPortfolio"))
const Login = lazy(() => import("./Pages/Auth/Login"))

function App() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-portfolio" element={<AddPortfolio />} />
        <Route path="/all-portfolio" element={<AllPortfolio />} />
        <Route path="/edit-portfolio/:username" element={<EditPortfolio />} />
        <Route path="/recycle-bin" element={<RecycledPortfolio />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  )
}

export default App

