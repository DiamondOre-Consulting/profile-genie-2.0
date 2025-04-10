import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import wavyhand from "../../assets/hand-waving.gif";
import { Link } from "react-router-dom";
import AdminAllCatalogue from "./AdminAllCatalogue";


const AdminAllPortfolio = () => {
  const [allportfolio, setAllPortfolio] = useState([]);

  useEffect(() => {
    const handleGetPortfolios = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://api.profilegenie.in/api/admin/all-profiles",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("all portfolio", response.data);
          setAllPortfolio(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleGetPortfolios();
  }, []);

  return (
    <>
      <div className="font-mono text-4xl font-bold md:text-4xl ">
        <div className="flex items-center">
          <h1>Welcome Admin</h1>
          <img src={wavyhand} alt="" className="w-28" />
        </div>
      </div>
      <h1 className="mt-8 text-4xl font-semibold ">
        All Portfolio
      </h1>
      <div className="w-40 h-1 mb-10 bg-gray-900 rounded-md"></div>
      <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-4">
        {allportfolio.map((portfolio) => (
          <Link
            to={`/admin-dashboard/edit-portfolio/${portfolio?.uniqueUserName}`}
            className={`border pl-3 pr-4 pt-4  pb-8 cursor-pointer ${portfolio?.toggleActivate ? 'bg-[#2C1E4A]' : 'bg-red-900'} text-gray-100 opacity-70 hover:opacity-90 border-1 border-black rounded-md`}
          >
            <p>Name : {portfolio.name}</p>
            <p>Email : {portfolio.email}</p>
            <p>phone: +91 {portfolio.phone}</p>
          </Link>
        ))}
      </div>

      <AdminAllCatalogue />
    </>
  );
};

export default AdminAllPortfolio;
