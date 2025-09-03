


import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cart, setCart] = useState([]);
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load cart data from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Close dropdown when clicking outside
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    window.location.href = "/login";
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg py-2 border-b border-amber-100" : "bg-gradient-to-r from-amber-600 to-amber-700 py-3"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className={`text-xl font-bold font-serif ${scrolled ? "text-amber-700" : "text-white"}`}>Pahana Bookshop</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/home" className={`font-medium transition-colors hover:text-amber-600 ${scrolled ? "text-amber-700" : "text-white"}`}>
            Home
          </Link>
          <Link to="/aboutus" className={`font-medium transition-colors hover:text-amber-600 ${scrolled ? "text-amber-700" : "text-white"}`}>
            About
          </Link>
          <Link to="/books" className={`font-medium transition-colors hover:text-amber-600 ${scrolled ? "text-amber-700" : "text-white"}`}>
            Shop
          </Link>
          <Link to="/contactus" className={`font-medium transition-colors hover:text-amber-600 ${scrolled ? "text-amber-700" : "text-white"}`}>
            Contact
          </Link>
          <Link to="/guide" className={`font-medium transition-colors hover:text-amber-600 ${scrolled ? "text-amber-700" : "text-white"}`}>
            Guide
          </Link>
        </div>

        {/* Right side icons */}
        <div className="flex items-center space-x-6">
          {/* Cart Icon */}
          <div className="relative">
            <Link to="/cart" className="flex items-center space-x-2 focus:outline-none">
              <svg className={`h-6 w-6 ${scrolled ? "text-amber-700" : "text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 极.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <span className={`font-medium ${scrolled ? "text-amber-700" : "text-white"}`}>
                Cart ({cart.length})
              </span>
            </Link>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            {userId ? (
              <button onClick={() => setOpen(!open)} className="flex items-center space-x-2 focus:outline-none">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center text-white font-semibold shadow-md">
                  {userName ? userName.charAt(0).toUpperCase() : "U"}
                </div>
                <span className={`font-medium ${scrolled ? "text-amber-700" : "text-white"}`}>{userName || "User"}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${open ? "transform rotate-180" : ""} ${scrolled ? "text-amber-600" : "text-amber-100"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            ) : (
              <Link to="/login" className={`px-4 py-2 rounded-lg font-medium transition-all shadow-md hover:shadow-lg ${scrolled ? "bg-amber-600 text-white hover:bg-amber-700" : "bg-white text-amber-600 hover:bg-amber-50"}`}>
                Login
              </Link>
            )}

            {/* Dropdown Menu */}
            <div
              className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 transform border border-amber-100 ${
                open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <div className="py-1">
                <Link to="/user" className="flex items-center px-4 py-3 text-sm text-amber-700 hover:bg-amber-50 transition-colors" onClick={() => setOpen(false)}>
                  <svg className="w-5 h-5 mr-3 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-极-7z"></path>
                  </svg>
                  My Profile
                </Link>

                <hr className="my-1 border-amber-100" />
                <button onClick={handleLogout} className="flex items-center w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu button (optional) */}
      <div className="md:hidden flex justify-end px-4 py-2">
        <button className="text-amber-700 focus:outline-none">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </nav>
  );
}