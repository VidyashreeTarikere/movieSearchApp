// import React, { useState } from "react";
import AppLogo from "../assets/default.svg";
import Avatar from "./Avatar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const Header = ({ supabase, setExploreType, setExplore, setCountryCode }) => {
  // const [userLocation, setUserLocation] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLat(latitude);
            setLong(longitude);
          },

          (error) => {
            console.error("Error getting user location:", error);
            setLat(37.0902);
            setLong(-95.7129);
          },
          {
            timeout: 10000,
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setLat(37.0902);
        setLong(-95.7129);
      }
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    const getCountryCode = async () => {
      const reverseApi = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`;
      const response = await fetch(reverseApi);
      const data = await response.json();
      setCountryCode(data.address.country_code.toUpperCase());
    };

    getCountryCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, long]);

  const handleLogoClick = () => {
    setExplore(false);
    navigate("/", { replace: true });
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    setExplore(false);
    setExploreType(null);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { path: "/shows", label: "Shows" },
    { path: "/movies", label: "Movies" },
    { path: "/mylist", label: "MyList" },
  ];

  const isActivePath = (path) => location.pathname === path;

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#040720] backdrop-blur-md shadow-lg border-b border-gray-800"
            : "bg-[#040720]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20 text-[#E0E0E0] bg-[#040720]">
            <div className="flex-shrink-0">
              <Link to="/" onClick={handleLogoClick}>
                <div className="inline-flex items-center cursor-pointer group select-none font-bold text-2xl sm:text-3xl lg:text-4xl transition-all duration-300 hover:scale-105">
                  <span className="text-blue-500 group-hover:text-blue-400 transition-colors duration-300">
                    Sh
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-1 w-5 h-5 sm:w-6 sm:h-6 fill-red-500 group-hover:fill-red-400 transition-all duration-300"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <polygon points="6,4 20,12 6,20" />
                  </svg>
                  <span className="text-blue-500 group-hover:text-blue-400 transition-colors duration-300">
                    w
                  </span>
                  <span className="text-red-500 group-hover:text-red-400 font-normal transition-colors duration-300">
                    Case
                  </span>
                </div>
              </Link>
            </div>

            <nav className="hidden lg:flex items-center space-x-8 xl:space-x-12">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  className={`relative text-lg xl:text-xl font-medium transition-all duration-300 hover:text-blue-400 ${
                    isActivePath(item.path)
                      ? "text-blue-500"
                      : "text-gray-200 hover:text-blue-400"
                  }`}
                >
                  {item.label}
                  {isActivePath(item.path) && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#040720] rounded-full"></span>
                  )}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center">
                <Avatar supabase={supabase} />
              </div>
            </div>

            <div className="lg:hidden flex items-center space-x-3">
              <div className="flex items-center">
                <Avatar supabase={supabase} />
              </div>

              <button
                onClick={toggleMobileMenu}
                className="text-gray-200 hover:text-blue-400 transition-colors duration-200 p-2 rounded-md hover:bg-[#040720]"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="bg-gray-900/98 backdrop-blur-sm border-t border-gray-800">
            <nav className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  className={`block px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
                    isActivePath(item.path)
                      ? "text-blue-500 bg-blue-500/10 border-l-4 border-blue-500"
                      : "text-gray-200 hover:text-blue-400 hover:bg-[#040720]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-[#040720] backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Header;
