import { NavbarSegmented } from "./components/Navbar"
import AddPortfolio from "./Pages/AddPortfolio"
import { Route, Routes } from "react-router-dom"

function App() {

  return (
    <NavbarSegmented >
      <Routes>
        <Route path="/" element={<AddPortfolio />} />
      </Routes>
    </NavbarSegmented>

  )
}

export default App
