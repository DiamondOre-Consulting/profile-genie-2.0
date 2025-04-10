import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const AdminAllCatalogue = () => {

  const [allCatalogue, setAllCatalogue] = useState([]);

  useEffect(() => {
    const handleGetPortfolios = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://api.profilegenie.in/api/client/all-catalogues",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("all catalogue", response.data);
          setAllCatalogue(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleGetPortfolios();
  }, []);

  return (
    <div>
      <h1 className="mt-8 text-4xl font-semibold ">
        All catalogue
      </h1>
      <div className="w-40 h-1 mb-10 bg-gray-900 rounded-md"></div>
      <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-4">
        {allCatalogue.map((portfolio, index) => (
          <Link key={index}
            to={`/admin-dashboard/edit-catalogue/${portfolio?.userName}`}
            className="border pl-3 pr-4 pt-4  pb-8 cursor-pointer bg-[#2C1E4A] text-gray-100 opacity-70 hover:opacity-90 border-1 border-black rounded-md"
          >
            <p>Name : {portfolio.name}</p>
            <p>Email : {portfolio.email}</p>
            <p>phone: +91 {portfolio.phone}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AdminAllCatalogue
