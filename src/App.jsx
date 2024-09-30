import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./assets/Pages/LandingPage"
import Filter from "./assets/Pages/Filter"
import Blast from "./assets/Pages/Blast"
import Risman from "./assets/Pages/Risman"

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        {/* bisa di akses sebelum login */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/filter-app" element={<Filter />} />
        <Route path="/blast-wa" element={<Blast />} />
        <Route path="/risman" element={<Risman />} />

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
