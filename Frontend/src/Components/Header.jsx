import React, { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header({ cartItemCount, cart, onCartClick }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Left - Logo */}
                <div className="flex items-center space-x-4">
                    <span className="text-xl font-bold text-green-600">Food Heaven</span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-6">
                    <Link to="/home" className="text-gray-600 hover:text-green-600">Home</Link>
                    <Link to="/home" className="text-gray-600 hover:text-green-600">Menu</Link>
                    <Link to="/home" className="text-gray-600 hover:text-green-600">About</Link>
                </nav>

                {/* Right - Cart + Profile */}
                <div className="flex items-center space-x-4">
                    <Link onClick={onCartClick}
                        className="relative bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg flex items-center justify-center">
                        <AiOutlineShoppingCart className="w-4 h-4 text-white" />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-yellow-300 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>
                    <Link to="/profile">
                        <FaUserCircle className="w-7 h-7 text-gray-700 hover:text-green-600" />
                    </Link>

                    {/* Hamburger Icon for Mobile */}
                    <button className="md:hidden" onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? (
                            <FaTimes className="w-6 h-6 text-gray-700" />
                        ) : (
                            <FaBars className="w-6 h-6 text-gray-700" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <nav className="md:hidden px-4 pb-4 space-y-2 bg-white shadow">
                    <Link to="/home" className="block text-gray-600 hover:text-green-600" onClick={closeMobileMenu}>Home</Link>
                    <Link to="/home" className="block text-gray-600 hover:text-green-600" onClick={closeMobileMenu}>Menu</Link>
                    <Link to="/home" className="block text-gray-600 hover:text-green-600" onClick={closeMobileMenu}>About</Link>
                </nav>
            )}
        </header>
    );
}

export default Header;