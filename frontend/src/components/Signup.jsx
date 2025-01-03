import { useState } from "react";
import { api } from "../http/client";
import { toast } from "react-toastify";

const SignUpForm = ({ closeModal }) => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); // Track loading state

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) {
            newErrors.name = "Name is required.";
        }
        if (!formData.email) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email address is invalid.";
        }
        if (!formData.password) {
            newErrors.password = "Password is required.";
        } else {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
            if (!regex.test(formData.password)) {
                newErrors.password =
                    "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one digit, and one special character.";
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true); // Set loading to true when API call starts
        try {
            const response = await api.post("/api/auth/signup", formData);
            if (response.status === 201) {
                closeModal()
                toast.success("Sign up successful! Please log in");
                setFormData({ name: "", email: "", password: "" });
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error("Invalid credentials, please try again.");
            } else {
                toast.error("An error occurred. Please try again later.");
            }
        } finally {
            setLoading(false); // Reset loading state after API call
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome to Airbnb</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className={`w-full mt-2 p-3 border ${errors.name ? "border-red-500" : "border-gray-300"
                            } rounded-md focus:ring-2 focus:ring-primary`}
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className={`w-full mt-2 p-3 border ${errors.email ? "border-red-500" : "border-gray-300"
                            } rounded-md focus:ring-2 focus:ring-primary`}
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className={`w-full mt-2 p-3 border ${errors.password ? "border-red-500" : "border-gray-300"
                            } rounded-md focus:ring-2 focus:ring-primary`}
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary text-white p-3 rounded-md hover:bg-primary/90 flex items-center justify-center disabled:bg-light"
                    disabled={loading}
                >
                    {loading ? (
                        <svg
                            className="w-5 h-5 text-white animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                className="opacity-25"
                            />
                            <path
                                fill="currentColor"
                                d="M4 12a8 8 0 0116 0"
                                className="opacity-75"
                            />
                        </svg>
                    ) : (
                        "Sign Up"
                    )}
                </button>
            </form>
        </div>
    );
};

export default SignUpForm;
