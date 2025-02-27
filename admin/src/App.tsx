import AddPortfolio from "./Pages/AddPortfolio"
import { Route, Routes } from "react-router-dom"
import AllPortfolio from "./Pages/AllPortfolio"
import EditPortfolio from "./Pages/EditPortfolio"
import RecycledPortfolio from "./Pages/RecycledPortfolio"
import Dashboard from "./Pages/Dashboard"
import PageNotFound from "./Pages/PageNotFound"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/add-portfolio" element={<AddPortfolio />} />
      <Route path="/all-portfolio" element={<AllPortfolio />} />
      <Route path="/edit-portfolio/:username" element={<EditPortfolio />} />
      <Route path="/recycle-bin" element={<RecycledPortfolio />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>

  )
}

export default App
