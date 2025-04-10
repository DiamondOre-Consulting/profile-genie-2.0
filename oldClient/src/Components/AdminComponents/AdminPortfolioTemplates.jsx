import React from "react";
import { Link } from "react-router-dom";

const AdminPortfolioTemplates = ({ setSelectedTemplateId }) => {

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplateId(templateId); // Update selected template ID state
    // Redirect to portfolio form with selected template ID
  };
  return (
    <div>
      <div>
        <div className="h-screen">
          <div className="grid grid-cols-4 px-20 mt-10 gap-10 ">
            {/* Display templates and allow selection */}
        

           <Link
              to={`/admin-dashboard/create-profile/1`}
              onClick={() => handleTemplateSelect(1)}
              className="border rounded-md border-1 h-60 bg-orange-300 text-gray-100 text-2xl font-bold flex items-center text-center justify-center"
            >
              Template 1
            </Link>

         
            <Link
              to={`/admin-dashboard/create-profile/3`}
              onClick={() => handleTemplateSelect(3)}
              className="border border-1 rounded-md h-60 bg-green-300  text-2xl text-gray-100 font-bold flex items-center text-center justify-center"
            >
              Template 2
            </Link>
            {/* Add more templates as needed */}

{/* dummy */}
            <Link
              to={`/admin-dashboard/create-profile/4`}
              onClick={() => handleTemplateSelect(4)}
              className="border border-1 rounded-md h-60 bg-green-300  text-2xl text-gray-100 font-bold flex items-center text-center justify-center"
            >
              Template 3
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPortfolioTemplates;
