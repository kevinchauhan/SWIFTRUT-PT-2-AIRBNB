import { useState, useEffect, useRef } from "react";
import { FiAlignJustify } from "react-icons/fi";
import Modal from "./Modal";
import SignUpForm from "./Signup";
import LoginForm from "./Login";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { api } from "../http/client"; // Assuming you have a configured API client
import { toast } from "react-toastify";

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSignup, setIsSignup] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { isAuthenticated, logout } = useAuthStore();

    const openModal = (isSignup) => {
        setIsSignup(isSignup);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const closeDropdown = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsDropdownOpen(false);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await api.post("/api/auth/logout");
            if (response.status === 200) {
                logout()
                toast.success("Successfully logged out.");
            } else {
                toast.error("Failed to log out. Please try again.");
            }
        } catch (error) {
            console.error("Error logging out:", error);
            toast.error("An error occurred while logging out.");
        }
    };

    useEffect(() => {
        document.addEventListener("click", closeDropdown);
        return () => {
            document.removeEventListener("click", closeDropdown);
        };
    }, []);

    return (
        <nav className="border-b shadow-sm">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center">
                    <a href="/" className="text-2xl font-bold text-primary">
                        <Logo />
                    </a>
                </div>

                {/* Search Bar */}
                <div className="hidden md:flex items-center border rounded-full px-4 py-2 shadow-sm">
                    <input
                        type="text"
                        placeholder="Start your search"
                        className="outline-none w-48 sm:w-64 md:w-80 lg:w-96 text-sm text-gray-600"
                    />
                    <button className="ml-2 text-white bg-primary rounded-full p-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-4.35-4.35m1.1-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                            />
                        </svg>
                    </button>
                </div>

                {/* Airbnb Your Home Link */}
                {isAuthenticated && (
                    <div className="hidden md:flex items-center">
                        <Link to="/create-listing" className="hover:text-primary">
                            Airbnb Your Home
                        </Link>
                    </div>
                )}

                {/* User Dropdown */}
                <div className="flex items-center space-x-4 border rounded-full p-1 pl-2 shadow-sm">
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center space-x-4 cursor-pointer"
                        >
                            <div className="text-xl">
                                <FiAlignJustify />
                            </div>
                            <div className="rounded-full bg-gray-200 p-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-5 w-5 text-gray-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 3.582-8 8h16c0-4.418-3.582-8-8-8z"
                                    />
                                </svg>
                            </div>
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-40 z-40">
                                {isAuthenticated ? (
                                    <>
                                        <Link to='/'
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Home
                                        </Link>
                                        <Link to='/reservations'
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            My reservations
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Log Out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => openModal(true)}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Sign Up
                                        </button>
                                        <button
                                            onClick={() => openModal(false)}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Log In
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                closeModal={closeModal}
                title={isSignup ? "Sign Up" : "Log In"}
            >
                {isSignup ? <SignUpForm closeModal={closeModal} /> : <LoginForm closeModal={closeModal} />}
            </Modal>
        </nav>
    );
};

export default Navbar;
