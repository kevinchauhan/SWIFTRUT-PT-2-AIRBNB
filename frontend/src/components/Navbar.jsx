import { useState, useEffect, useRef } from 'react';
import Modal from './Modal';
import SignUpForm from './Signup';
import LoginForm from './Login';

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSignup, setIsSignup] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

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

    useEffect(() => {
        document.addEventListener('click', closeDropdown);
        return () => {
            document.removeEventListener('click', closeDropdown);
        };
    }, []);

    return (
        <nav className="border-b shadow-sm">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <div className="flex items-center">
                    <a href="/" className="text-2xl font-bold text-primary">
                        airbnb
                    </a>
                </div>

                <div className="hidden md:flex items-center border rounded-full px-4 py-2 shadow-sm">
                    <input
                        type="text"
                        placeholder="Start your search"
                        className="outline-none w-48 sm:w-64 md:w-80 lg:w-96 text-sm text-gray-600"
                    />
                    <button className="ml-2 text-white bg-primary rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.1-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
                        </svg>
                    </button>
                </div>

                <div className="flex md:hidden items-center border rounded-full px-3 py-1 shadow-sm">
                    <button className="text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.1-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
                        </svg>
                    </button>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative" ref={dropdownRef}>
                        <button onClick={toggleDropdown} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 text-gray-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 3.582-8 8h16c0-4.418-3.582-8-8-8z" />
                            </svg>
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-40">
                                <button onClick={() => openModal(true)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Sign Up
                                </button>
                                <button onClick={() => openModal(false)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Log In
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} closeModal={closeModal} title={isSignup ? "Sign Up" : "Log In"}>
                {isSignup ? <SignUpForm /> : <LoginForm />}
            </Modal>
        </nav>
    );
};

export default Navbar;
