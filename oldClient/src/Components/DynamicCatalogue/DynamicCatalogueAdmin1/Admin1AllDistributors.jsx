import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Admin1Nav from "./Admin1Nav";
import axios from "axios";

const Admin1AllDistributors = () => {
  const [distributors, setDistributors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDistributor, setNewDistributor] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Open modal (with optional edit functionality)
  const openModal = (index = null) => {
    if (index !== null) {
      const distributor = distributors[index];
      setNewDistributor({
        name: distributor.name,
        email: distributor.email,
        phone: distributor.phone,
        password: "", // You might want to handle passwords differently in a real app
      });
    } else {
      setNewDistributor({ name: "", email: "", phone: "", password: "" });
    }
    setEditIndex(index);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSuccessMessage("");
    setErrorMessage("");
    setEditIndex(null);
    setNewDistributor({ name: "", email: "", phone: "", password: "" });
  };

  // Handle form input changes
  const handleChange = (e) => {
    setNewDistributor({ ...newDistributor, [e.target.name]: e.target.value });
  };

  // Add or update the distributor
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editIndex === null) {
      // Add new distributor
      try {
        const response = await axios.post(
          "https://api.profilegenie.in/api/client/add-distributor",
          newDistributor,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        setIsModalOpen(false);
        setSuccessMessage("Distributor added successfully!");
        setTimeout(closeModal, 2000);
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message || "Error adding distributor."
        );
      }
    } else {
      // Update distributor
      try {
        const response = await axios.put(
          `https://api.profilegenie.in/api/client/update-distributor/${distributors[editIndex]._id}`,
          newDistributor,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const updatedDistributors = [...distributors];
        updatedDistributors[editIndex] = response.data;
        setDistributors(updatedDistributors);
        setSuccessMessage("Distributor updated successfully!");
        setTimeout(closeModal, 2000);
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message || "Error updating distributor."
        );
      }
    }
  };

  // Handle delete distributor
  // const handleDelete = async (index) => {
  //   try {
  //     await axios.delete(`https://api.profilegenie.in/api/client/delete-distributor/${distributors[index]._id}`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     const updatedDistributors = distributors.filter((_, i) => i !== index);
  //     setDistributors(updatedDistributors);
  //     setSuccessMessage("Distributor deleted successfully!");
  //   } catch (error) {
  //     setErrorMessage(error.response?.data?.message || "Error deleting distributor.");
  //   }
  // };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const [alldistributors, setAllDistributors] = useState([]);

  useEffect(() => {
    const handleGetAllDistributors = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://api.profilegenie.in/api/client/all-distributors",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("all distributors", response.data);
          setAllDistributors(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleGetAllDistributors();
  }, []);

  // handle
  const [distributorid, setDistributorId] = useState("");
  const [deletepopup, setDeletePopUp] = useState(false);

  const handledeleteclick = (id) => {
    console.log("clicked");
    console.log(id)
    setDistributorId(id);
    setDeletePopUp(true);
  };

  const handleDeleteDistributor = async () => {
    const token = localStorage.getItem("token");
    try {
      const distributorToUpdate = alldistributors.find((distributor) => distributor._id === distributorid);
      const currentStatus = distributorToUpdate.status;
      const newStatus = currentStatus === true ? false : true; // Toggle status

      const response = await axios.put(
        `https://api.profilegenie.in/api/client/status-distributor/${distributorid}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Update the status locally after success
        const updatedDistributors = alldistributors.map((distributor) =>
          distributor._id === distributorid
            ? { ...distributor, status: newStatus }
            : distributor
        );
        setAllDistributors(updatedDistributors);
        setDeletePopUp(false);
        console.log("Distributor status updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <Admin1Nav />

      <div>
        <p className="text-center text-4xl py-4 font-bold uppercase">
          All Distributors
        </p>
        <div className="w-40 h-0.5 bg-black mx-auto mb-8"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-4">
          {alldistributors.map((distributor, index) => (
            <div
              key={index}
              className={`  ${distributor.status === true ? 'bg-white' : 'bg-red-300 '} shadow-md border border-gray-300 rounded-lg p-6 text-center hover:shadow-lg transition-shadow`}
            >
              <div className="mb-4 flex justify-center">
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {distributor.name.charAt(0)}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{distributor.name}</h3>
              <p className="text-gray-700 mb-1">{distributor.email}</p>
              <p className="text-gray-700">{distributor.phone}</p>

              <div className="mt-6 flex justify-end">
                {/* <button
                  onClick={() => openModal(index)}
                  className="text-blue-500 hover:text-blue-700 text-lg"
                >
                  <FaEdit />
                </button> */}
                <button
                  onClick={() => handledeleteclick(distributor._id)}
                  className="text-red-500 hover:text-red-700 text-lg"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}

          {/* Add Distributor Card */}
          <div
            onClick={() => openModal()}
            className="bg-gray-100 shadow-md border flex flex-col justify-center border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="mb-4 flex justify-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-3xl">
                +
              </div>
            </div>
            <h3 className="text-xl font-semibold">Add Distributor</h3>
          </div>
        </div>

        {/* Modal for Adding/Editing Distributor */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={handleBackdropClick}
          >
            <div className="bg-white rounded-lg p-6 w-96">
              <h3 className="text-2xl font-semibold mb-4">
                {editIndex !== null
                  ? "Edit Distributor"
                  : "Add New Distributor"}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-left mb-2 font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newDistributor.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-left mb-2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={newDistributor.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-left mb-2 font-medium">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={newDistributor.phone}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-left mb-2 font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={newDistributor.password}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-black text-white w-full px-4 py-2 rounded"
                  >
                    {editIndex !== null ? "Update" : "Add"}
                  </button>
                </div>
              </form>
              {successMessage && (
                <p className="text-green-500 mt-4 text-center">
                  {successMessage}
                </p>
              )}
              {errorMessage && (
                <p className="text-red-500 mt-4 text-center">{errorMessage}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {deletepopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleBackdropClick}
        >
          <div class="p-6 pt-0 text-center bg-white rounded-md">
            <svg
              class="w-20 h-20 text-red-600 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 class="text-xl font-normal text-gray-500 mt-5 mb-6">
              Are you sure you want change the Status?
            </h3>
            <a

              onClick={handleDeleteDistributor}
              class="text-white bg-red-600 cursor-pointer hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2"
            >
              Yes, I'm sure
            </a>
            <a
              href="#"
              onClick={() => setDeletePopUp(false)}
              class="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
              data-modal-toggle="delete-user-modal"
            >
              No, cancel
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin1AllDistributors;
