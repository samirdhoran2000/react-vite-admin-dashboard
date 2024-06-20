// src/components/Header.js
// import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useLocation } from "react-router-dom";
import "./header.css";

const Header = () => {
    const location = useLocation();
  const locationValue = location.pathname.substring(1, location.pathname.length - 1);
  return (
    <div className="header">
      <div className="header-content">
        {locationValue === "/" ? (
          <h3>
            <HomeOutlinedIcon />
          </h3>
        ) : (
          <h3>
            <HomeOutlinedIcon /> &nbsp;&nbsp;&nbsp; {locationValue}
          </h3>
        )}
      </div>
    </div>
  );
};

export default Header;
