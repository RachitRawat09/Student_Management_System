import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const handleAdmissionForm = () => {
    navigate("/admission");
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => scrollToSection('hero')}
              className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-blue-600' : 'text-white'
              }`}
            >
              Student ERP
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection('about')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                    : 'text-white hover:text-blue-200 hover:bg-white/10'
                }`}
              >
                About Us
              </button>
              
              <button
                onClick={() => scrollToSection('courses')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                    : 'text-white hover:text-blue-200 hover:bg-white/10'
                }`}
              >
                Courses Offered
              </button>
              
              <button
                onClick={handleAdmissionForm}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                    : 'text-white hover:text-blue-200 hover:bg-white/10'
                }`}
              >
                Admission Form
              </button>
              
              <button
                onClick={handleLogin}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isScrolled
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                    : 'bg-white text-blue-600 hover:bg-blue-50 shadow-lg'
                }`}
              >
                Login
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                  : 'text-white hover:text-blue-200 hover:bg-white/10'
              }`}
            >
              <svg
                className={`h-6 w-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className={`px-2 pt-2 pb-3 space-y-1 transition-colors duration-300 ${
          isScrolled ? 'bg-white shadow-lg' : 'bg-black/20 backdrop-blur-md'
        }`}>
          <button
            onClick={() => scrollToSection('about')}
            className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-300 ${
              isScrolled 
                ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                : 'text-white hover:text-blue-200 hover:bg-white/10'
            }`}
          >
            About Us
          </button>
          
          <button
            onClick={() => scrollToSection('courses')}
            className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-300 ${
              isScrolled 
                ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                : 'text-white hover:text-blue-200 hover:bg-white/10'
            }`}
          >
            Courses Offered
          </button>
          
          <button
            onClick={handleAdmissionForm}
            className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-300 ${
              isScrolled 
                ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                : 'text-white hover:text-blue-200 hover:bg-white/10'
            }`}
          >
            Admission Form
          </button>
          
          <button
            onClick={handleLogin}
            className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-300 ${
              isScrolled
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-white text-blue-600 hover:bg-blue-50'
            }`}
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
