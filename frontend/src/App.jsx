import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import CategoryNavbar from "./components/CategoryNavbar";
import { Route, Routes } from "react-router-dom";
import CreateListing from "./pages/CreateListing";
import Home from "./pages/Home";
import ListingDetails from "./pages/ListingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import useAuthStore from "./store/authStore";
import { api } from "./http/client";
import ReservationPage from "./pages/Reservation";

const App = () => {
  const { login, logout, setLoading } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      try {
        const response = await api.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/auth/self`);
        if (response.data.user) {
          login(response.data.user);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Error initializing authentication:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [login, logout, setLoading]);

  return (
    <>
      <Navbar />
      <CategoryNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-listing" element={<ProtectedRoute component={CreateListing} />} />
        <Route path="/reservations" element={<ProtectedRoute component={ReservationPage} />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
