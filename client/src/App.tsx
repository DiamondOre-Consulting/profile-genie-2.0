import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Catalogue1 from "./Catalogue/Page/Catalogue1"
import Catalogue1Cart from "./Catalogue/Page/Catalogue1Cart"
import Catalogue1Dashboard from "./Catalogue/Catalogue1Dashboard"
const Home = lazy(() => import("./Pages/Home"))
const Template1 = lazy(() => import("./Templates/templatePages/Template1"))

function App() {

  return (
    <Suspense fallback={<div>loading</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/1/:username" element={<Template1 />} />
        <Route path="/catalogue/1/:userName/*" element={<Catalogue1Dashboard />} />
      </Routes>
    </Suspense>
  )
}

export default App

