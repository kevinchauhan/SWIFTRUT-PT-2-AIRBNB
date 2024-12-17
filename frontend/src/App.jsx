import { ToastContainer } from "react-toastify"
import Navbar from "./components/Navbar"
import CategoryNavbar from "./components/CategoryNavbar"
import { Route, Routes } from "react-router-dom"
import CreateListing from "./pages/CreateListing"
import Home from "./pages/Home"
import ListingDetails from "./pages/ListingPage"

const App = () => {
  return (
    <>
      <Navbar />
      <CategoryNavbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create-listing' element={<CreateListing />} />
        <Route path='/listing/:id' element={<ListingDetails />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App