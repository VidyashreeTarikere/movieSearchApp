// import React, { useState } from "react";
import AppLogo from "../assets/default.svg";
import Avatar from "./Avatar";
import { Link, useNavigate } from "react-router-dom";
import Search from "./SearchBar";
import { useEffect, useState } from "react";

const Header = ({ supabase, setExploreType, setExplore, setCountryCode }) => {
  // const [userLocation, setUserLocation] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  const navigate = useNavigate();

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
  }, [lat, long]);

  const handleLogoClick = () => {
    setExplore(false);
    navigate("/", { replace: true });
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 gap-6 w-full">
        {/* Logo links to Home */}
        <Link to="/" className="flex items-center gap-6">
          <img
            src={AppLogo}
            alt="CineAI Logo"
            style={{ width: "200px" }}
            onClick={handleLogoClick}
          />
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6 text-lg font-medium">
          <Link
            to="/shows"
            onClick={() => {
              setExplore(false);
              setExploreType(null);
            }}
            className="hover:underline"
          >
            Shows
          </Link>

          <Link
            to="/movies"
            onClick={() => {
              setExplore(false);
              setExploreType(null);
            }}
            className="hover:underline"
          >
            Movies
          </Link>

          <Link
            to="/mylist"
            onClick={() => {
              setExplore(false);
              setExploreType(null);
            }}
            className="hover:underline"
          >
            MyList
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Avatar supabase={supabase} />
        </div>
      </div>
    </>
  );
};

export default Header;
