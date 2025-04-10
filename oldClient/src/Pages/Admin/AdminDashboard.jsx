// Assuming the Router is already in your main app entry point (like App.js or index.js)
import React, { useState, useRef, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/QR~Genie logo.png";
import AdminAllPortfolio from "../../Components/AdminComponents/AdminAllPortfolio";
import PortfolioForm from "../../Components/AdminComponents/PortfolioForm";
import EditPortfolio from "../../Components/AdminComponents/EditPortfolio";
import AdminPortfolioTemplates from "../../Components/AdminComponents/AdminPortfolioTemplates";
import AdminCreateCatalogue from "../../Components/AdminComponents/AdminCreateCatalogue";
import AdminEditCatalogue from "../../Components/AdminComponents/AdminEditCatalogue";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
    console.log("Logging out");
  };

  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="">
      <button
        data-drawer-target="logo-sidebar"
        onClick={toggleSidebar}
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200   "
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <button
        ref={buttonRef} // Attach reference to the button
        data-drawer-target="logo-sidebar"
        onClick={toggleSidebar}
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200   "
      ></button>

      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 w-64 h-screen z-10 p-4 bg-[#2C1E4A] bg-opacity-70 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="overflow-y-auto">
          <img
            src={logo}
            class="h-6=20 h-20 me-3 sm:h-20 mb-4 rounded-full"
            alt="Flowbite Logo"
          />
          <ul className="space-y-2 mt-10">
            <li>
              <Link
                to={"/admin-dashboard"}
                href="#"
                class="flex items-center p-2 text-gray-100 text-xl text-mono rounded-lg  hover:bg-gray-100 hover:text-gray-900  group"
              >
                <svg
                  class="w-8 h-8 text-gray-100 transition duration-75  group-hover:text-gray-900 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span class="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/admin-dashboard/templates"}
                class="flex items-center p-2 text-gray-100 text-xl text-mono rounded-lg  hover:bg-gray-100 hover:text-gray-900  group"
              >
                <svg
                  class="w-8 h-8 text-gray-100  group-hover:text-gray-900 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 7V2.221a2 2 0 0 0-.5.365L3.586 6.5a2 2 0 0 0-.365.5H8Zm2 0V2h7a2 2 0 0 1 2 2v.126a5.087 5.087 0 0 0-4.74 1.368v.001l-6.642 6.642a3 3 0 0 0-.82 1.532l-.74 3.692a3 3 0 0 0 3.53 3.53l3.694-.738a3 3 0 0 0 1.532-.82L19 15.149V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Z"
                    clip-rule="evenodd"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M17.447 8.08a1.087 1.087 0 0 1 1.187.238l.002.001a1.088 1.088 0 0 1 0 1.539l-.377.377-1.54-1.542.373-.374.002-.001c.1-.102.22-.182.353-.237Zm-2.143 2.027-4.644 4.644-.385 1.924 1.925-.385 4.644-4.642-1.54-1.54Zm2.56-4.11a3.087 3.087 0 0 0-2.187.909l-6.645 6.645a1 1 0 0 0-.274.51l-.739 3.693a1 1 0 0 0 1.177 1.176l3.693-.738a1 1 0 0 0 .51-.274l6.65-6.646a3.088 3.088 0 0 0-2.185-5.275Z"
                    clip-rule="evenodd"
                  />
                </svg>

                <span class="ms-3">Create Portfolio</span>
              </Link>
            </li>

            {/* create catalogue */}

            <li>
              <Link
                to={"/admin-dashboard/create-catalogue"}
                class="flex items-center p-2 text-gray-100 text-xl text-mono rounded-lg  hover:bg-gray-100 hover:text-gray-900  group"
              >
                <svg
                  class="w-8 h-8 text-gray-100  group-hover:text-gray-900 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 7V2.221a2 2 0 0 0-.5.365L3.586 6.5a2 2 0 0 0-.365.5H8Zm2 0V2h7a2 2 0 0 1 2 2v.126a5.087 5.087 0 0 0-4.74 1.368v.001l-6.642 6.642a3 3 0 0 0-.82 1.532l-.74 3.692a3 3 0 0 0 3.53 3.53l3.694-.738a3 3 0 0 0 1.532-.82L19 15.149V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Z"
                    clip-rule="evenodd"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M17.447 8.08a1.087 1.087 0 0 1 1.187.238l.002.001a1.088 1.088 0 0 1 0 1.539l-.377.377-1.54-1.542.373-.374.002-.001c.1-.102.22-.182.353-.237Zm-2.143 2.027-4.644 4.644-.385 1.924 1.925-.385 4.644-4.642-1.54-1.54Zm2.56-4.11a3.087 3.087 0 0 0-2.187.909l-6.645 6.645a1 1 0 0 0-.274.51l-.739 3.693a1 1 0 0 0 1.177 1.176l3.693-.738a1 1 0 0 0 .51-.274l6.65-6.646a3.088 3.088 0 0 0-2.185-5.275Z"
                    clip-rule="evenodd"
                  />
                </svg>

                <span class="ms-3">Create Catalogue</span>
              </Link>
            </li>

            {/* Logout  */}

            <li className="absolute bottom-8  ">
              <a
                onClick={handleLogout}
                class="flex items-center p-2 cursor-pointer text-gray-100 text-xl text-mono group rounded-lg  hover:bg-gray-100 hover:text-gray-900  group"
              >
                <svg
                  class="h-8 w-8 text-gray-100 group-hover:text-gray-900"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />{" "}
                  <path d="M7 12h14l-3 -3m0 6l3 -3" />
                </svg>

                <span class="ms-3">Logout</span>
              </a>
            </li>

            {/*  <li>
              <Link
                to="/admin-dashboard/signup"
                className="flex items-center p-2 text-gray-100 rounded-lg hover:bg-gray-100"
              >
                Sign Up
              </Link>
            </li>
            */}
          </ul>
        </div>
      </aside>

      <div className={`p-4 ml-0 sm:ml-64 ${isOpen ? "blur-sm" : ""}`}>
        <Routes>
          <Route path="/" element={<AdminAllPortfolio />} />
          <Route path="/templates" element={<AdminPortfolioTemplates />} />
          <Route
            path="/create-profile/:templateId"
            element={<PortfolioForm />}
          />
          <Route
            path="/edit-portfolio/:uniqueUserName"
            element={<EditPortfolio />}
          />

          <Route path="/edit-catalogue/:userName" element={<AdminEditCatalogue/>}/>


          <Route path="/create-catalogue" element={<AdminCreateCatalogue/>}/> 
        </Routes>

        
      </div>
    </div>
  );
};

export default AdminDashboard;
