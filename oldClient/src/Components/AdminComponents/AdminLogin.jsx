import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../CommonComponents/Navbar";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState(null);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    try {
      const response = await axios.post(
        "https://api.profilegenie.in/api/admin/login",
        {
          userName,
          password,
        }
      );

      if (response.status === 200) {
        const token = response.data.token;
        // console.log("token",response.data)
        // console.log(token)
        setShowLoader(false);
        // console.log(token)
        localStorage.setItem("token", token);
        console.log("Logged in successfully as Admin");
        navigate("/admin-dashboard");
      } else {
        console.log("Login failed");
        setShowLoader(false);
        setError("Login Details Are Wrong!!");
        alert("invalid username and password");
        // Handle login error
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          console.log("invalid user");
          setError("Login Details Are Wrong!!");
          setShowLoader(false);
        }
        if (status === 500) {
          console.log(response.error)
        }
        else {
          console.error("Error adding Student:", status);
          setShowLoader(false)
        }
      }
    }
  };

  const handleShowPassword = () => {
    return setShowPass(!showPass);
  };

  return (
    <div className="">
      {/* <Navbar /> */}
      <Navbar />

      <div class="min-h-screen bg-[#2C1E4A] bg-opacity-70 flex items-center justify-center w-full ">
        <div class="bg-white  shadow-md rounded-lg px-8 py-6 max-w-md">
          <h1 class="text-2xl font-bold text-center mb-4 font-serif">
            Admin Login
          </h1>
          <form
            action="#"
            onSubmit={handleAdminLogin}
            className="md:w-96  w-56"
          >
            <div class="mb-4">
              <label
                for="name"
                class="block text-sm font-medium text-gray-700  mb-2"
              >
                User Name
              </label>
              <input
                type="text"
                id="name"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your User Name"
                required
              />
            </div>
            <div class="mb-4">
              <label
                for="password"
                class="block text-sm font-medium text-gray-700  mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    aria-describedby="remember"
                    id="check"
                    type="checkbox"
                    value={showPassword}
                    onChange={() => setShowPassword((prev) => !prev)}
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300    "
                    required=""
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-gray-500 ">
                    Show password
                  </label>
                </div>
              </div>
              {/* <a href="#" class="text-sm font-medium text-primary-600 hover:underline ">Forgot password?</a> */}
            </div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2C1E4A] bg-[#2C1E4A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-900"
            >
              {" "}
              {showLoader ? (
                <svg
                  aria-hidden="true"
                  class="inline w-4 h-4 text-gray-200 animate-spin  fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                <span class="relative z-10">Login</span>
              )}
            </button>
          </form>

          {error && (
            <div className="flex items-center justify-center bg-red-300 p-4 rounded-m mt-4">
              <p className="text-center text-sm text-red-500">{error}</p>
            </div>
          )}
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default AdminLogin;
