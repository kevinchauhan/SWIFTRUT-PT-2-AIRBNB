import React from 'react';

const Navbar = () => {
    return (
        <nav className="border-b shadow-sm">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                {/* Left: Logo */}
                <div className="flex items-center">
                    <a href="/" className="text-2xl font-bold text-red-500">
                        airbnb
                    </a>
                </div>

                {/* Center: Search Bar for medium and larger screens */}
                <div className="hidden md:flex items-center border rounded-full px-4 py-2 shadow-sm">
                    <input
                        type="text"
                        placeholder="Start your search"
                        className="outline-none w-48 sm:w-64 md:w-80 lg:w-96 text-sm text-gray-600"
                    />
                    <button className="ml-2 text-white bg-red-500 rounded-full p-2">
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

                {/* Mobile Search Button for small screens */}
                <div className="flex md:hidden items-center border rounded-full px-3 py-1 shadow-sm">
                    <button className="text-gray-600">
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

                {/* Right: Navigation Links */}
                <div className="flex items-center space-x-4">
                    <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                        Become a Host
                    </a>
                    <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6 text-gray-600"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 5.25h16.5M3.75 12h16.5M3.75 18.75h16.5"
                            />
                        </svg>
                    </div>
                    <div className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6 text-gray-600"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 3.582-8 8h16c0-4.418-3.582-8-8-8z"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
