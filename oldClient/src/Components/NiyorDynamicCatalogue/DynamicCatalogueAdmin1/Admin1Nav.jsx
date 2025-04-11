// Admin1Nav.js
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Admin1Nav = ({ logo, myprofile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { userName } = useParams();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      window.open(`https://test.profilegenie.in/dynamic-catalogue/1/Ishan_Niyor_Perfumes`, '_blank');
    }
  };

  return (
    <nav className="p-4 bg-black">
      <div className="container flex items-center justify-between mx-auto">
        <div className="text-2xl font-bold text-white">
          <img src={logo} alt="Logo" className="w-40" />
        </div>
        <div className="hidden space-x-8 text-white md:flex">
          <Link
            to={`/dynamic-catalogue/admin/${userName}`}
            className="hover:text-gray-300"
          >
            Home
          </Link>
          {/* <Link to={`/dynamic-catalogue/admin/${userName}/admin-all-distributors`} className="hover:text-gray-300">All Distributors</Link> */}
          <Link
            to={`/dynamic-catalogue/1/${userName}`}
            target="_blank"
            className="hover:text-gray-300"
          >
            My Catalogue
          </Link>
          <a
            className="cursor-pointer hover:text-gray-300"
            onClick={handleLogout}
          >
            Logout
          </a>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col mt-4 space-y-4 text-white md:hidden">
          <Link
            to={`/dynamic-catalogue/admin/${userName}`}
            className="hover:text-gray-300"
          >
            Home
          </Link>
          {/* <Link to={`/dynamic-catalogue/admin/${userName}/admin-all-distributors`} className="hover:text-gray-300">All Distributors</Link> */}
          <Link
            to={`/dynamic-catalogue/${userName}`}
            target="_blank"
            className="hover:text-gray-300"
          >
            My Catalogue
          </Link>
          <a
            className="cursor-pointer hover:text-gray-300"
            onClick={handleLogout}
          >
            Logout
          </a>
        </div>
      )}
    </nav>
  );
};

export default Admin1Nav;
