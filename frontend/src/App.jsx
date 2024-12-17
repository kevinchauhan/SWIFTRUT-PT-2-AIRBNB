import { ToastContainer } from "react-toastify"
import Navbar from "./components/Navbar"
import CategoryNavbar from "./components/CategoryNavbar"
import StepForm from "./components/listing/StepForm"

const App = () => {
  return (
    <>
      <Navbar />
      <CategoryNavbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <StepForm />
      </div>
      <ToastContainer />
    </>
  )
}

export default App