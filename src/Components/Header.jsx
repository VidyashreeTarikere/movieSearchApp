import React from "react";
import AppLogo from "../assets/default.svg";
import Avatar from "./Avatar";
import { Link, useNavigate } from "react-router-dom";
import Search from "./SearchBar";

const Header = ({ supabase, setExploreType, setExplore }) => {
  const navigate = useNavigate();

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
