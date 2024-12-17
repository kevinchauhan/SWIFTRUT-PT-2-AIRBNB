import { ToastContainer } from "react-toastify"
import Navbar from "./components/Navbar"
import CategoryNavbar from "./components/CategoryNavbar"
import { Route, Routes } from "react-router-dom"
import CreateListing from "./pages/CreateListing"

const App = () => {
  return (
    <>
      <Navbar />
      <CategoryNavbar />
      <Routes>
        <Route path='/create-listing' element={<CreateListing />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App