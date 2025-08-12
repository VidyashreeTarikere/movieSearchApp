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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, long]);

  const handleLogoClick = () => {
    setExplore(false);
    navigate("/", { replace: true });
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 w-full text-[#E0E0E0] bg-[#040720]">
        <Link to="/" className="flex items-center gap-6">
          <div
            onClick={handleLogoClick}
            role="button"
            tabIndex={0}
            className="inline-flex items-center cursor-pointer group select-none font-montserrat font-semibold text-4xl "
            aria-label="ShowCase Logo"
          >
            <span className="text-[#2978FF] group-hover:text-gray-500">Sh</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-1 w-6 h-6 fill-[#FF6B6B] group-hover:text-gray-500"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <polygon points="6,4 20,12 6,20" />
            </svg>

            <span className="text-[#2978FF] group-hover:text-gray-500">w</span>

            <span className="text-[#FF6B6B] group-hover:text-gray-500 font-normal">
              Case
            </span>
          </div>
        </Link>

        <nav className="flex gap-40">
          <Link
            to="/shows"
            onClick={() => {
              setExplore(false);
              setExploreType(null);
            }}
            className="hover:text-blue-500 text-3xl"
          >
            Shows
          </Link>

          <Link
            to="/movies"
            onClick={() => {
              setExplore(false);
              setExploreType(null);
            }}
            className="hover:text-blue-500 text-3xl"
          >
            Movies
          </Link>

          <Link
            to="/mylist"
            onClick={() => {
              setExplore(false);
              setExploreType(null);
            }}
            className="hover:text-blue-500 text-3xl"
          >
            MyList
          </Link>
        </nav>

        <div className="flex items-center gap-4 text-2xl">
          <Avatar supabase={supabase} />
        </div>
      </div>
    </>
  );
};

export default Header;
