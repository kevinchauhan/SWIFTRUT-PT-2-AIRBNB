import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../http/client";
import useAuthStore from "../store/authStore"; // Adjust the path based on your setup

const ProtectedRoute = ({ component: Component }) => {
    const { isAuthenticated, loading, login, logout, setLoading } = useAuthStore();

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            try {
                const response = await api.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/auth/self`);
                if (response.data?.user) {
                    login(response.data?.user);
                } else {
                    logout();
                }
            } catch (error) {
                console.error("Authentication check failed:", error);
                logout();
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [login, logout, setLoading]);

    if (loading) {
        return <div className="text-center">Loading...</div>; // Show loading indicator
    }

    return isAuthenticated ? <Component /> : <Navigate to="/" />;
};

export default ProtectedRoute;
