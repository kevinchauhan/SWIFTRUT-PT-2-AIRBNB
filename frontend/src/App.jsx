import { ToastContainer } from "react-toastify"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <>
      <Navbar />
      <div className="bg-orange-800">App</div>
      <ToastContainer />
    </>
  )
}

export default App