import AddPortfolio from "./Pages/AddPortfolio"
import { Route, Routes } from "react-router-dom"
import AllPortfolio from "./Pages/AllPortfolio"

function App() {

  return (
    <Routes>
      <Route path="/" element={<AddPortfolio />} />
      <Route path="/add-portfolio" element={<AddPortfolio />} />
      <Route path="/all-portfolio" element={<AllPortfolio />} />
    </Routes>

  )
}

export default App
