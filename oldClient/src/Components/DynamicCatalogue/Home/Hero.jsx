import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useJwt } from "react-jwt";


const Hero = ({ myprofile, allproducts }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { userName } = useParams(); // To get the userName from the route

  // Regular expressions for validation
  const phoneRegex = /^[0-9]{10}$/;

  // Fetch token from localStorage
  const token = localStorage.getItem("token");

  // Decode the token using useJwt
  const { decodedToken } = useJwt(token);

  // Check if the user is logged in and if they are a distributor
  useEffect(() => {
    if (token && decodedToken) {
      console.log("decodedToken", decodedToken);
      if (decodedToken.role === "distributor") {
        setIsLoggedIn(true); // Mark user as logged in if role is distributor
      }
    }
  }, [token, decodedToken]);

  // Handle form submit for login/signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Validation
    if (!email || (!isLogin && (!name || !phone)) || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (!isLogin && !phoneRegex.test(phone)) {
      setErrorMessage("Phone number must be 10 digits.");
      return;
    }

    try {
      if (isLogin) {
        // Login request
        const response = await axios.post(
          `https://api.profilegenie.in/api/distributor/login-distributor/${userName}`,
          { email, password }
        );
        setSuccessMessage("Login successful!");
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token); // Store the token
        setErrorMessage("");
        setIsLoggedIn(true); // Mark user as logged in
        window.location.reload(); // Reload the page to reflect the login state
      } else {
        // Signup request
        const response = await axios.post(
          `https://api.profilegenie.in/api/distributor/signup-distributor/${userName}`,
          {
            name,
            email,
            phone,
            password,
          }
        );
        setSuccessMessage("Signup successful! You can now log in.");
        console.log(response.data);

        // Reset form fields
        setEmail("");
        setName("");
        setPhone("");
        setPassword("");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    }
  };

  const scatterImages =
    allproducts?.[0]?.products
      ?.slice(0, 3)
      .map((product) => product?.productImage) || [];

  return (
    <div className="grid grid-cols-1 bg-c2 lg:grid-cols-7 gap-4 justify-center py-10 items-start px-4 lg:px-10">
      <div className="col-span-4 flex flex-col items-center lg:items-start">
        <img
          src={myprofile?.brand?.brandLogo}
          alt="Logo"
          className="w-full max-w-xs md:w-80 "
        />

        <div className="md:ml-4">
          <h1 className="text-4xl tracking-wide lg:text-6xl font-bold text-center lg:text-left text-c1 mt-4">
            {myprofile?.brand?.brandName}
          </h1>
          <p className="mt-10 text-2xl text-gray-870">
            {myprofile?.brand?.brandTagline}
          </p>
          <a
            href={myprofile?.brand?.brandWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red text-center flex justify-center items-center hover:before:bg-redborder-c1 relative h-[50px] w-60 overflow-hidden border border-c1 mt-6 bg-white px-3 text-c1 transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-c1 before:transition-all before:duration-500 hover:text-white hover:shadow-red-500 hover:before:left-0 hover:before:w-full"
          >
            <span className="relative z-10">Visit Website</span>
          </a>
        </div>
      </div>

      <div className="col-span-3 w-full flex flex-col items-center justify-end py-4">
        {isLoggedIn ? (
          <div className="col-span-7 md:-ml-40 flex flex-wrap justify-center items-center">
            {scatterImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Scattered ${index}`}
                className={`w-60 h-52 m-5 transform transition-all duration-500 ${index % 2 === 0 ? "rotate-12" : "-rotate-12"
                  } hover:scale-110`}
              />
            ))}
          </div>
        ) : (
          <div className="w-full max-w-sm p-4 bg-white shadow-lg rounded-lg">
            <div className="flex justify-center mb-6">
              <button
                className={`px-4 py-4 text-sm font-medium w-full ${!isLogin ? "border-b-4 border-c1 text-c1" : "text-gray-900"
                  }`}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
              <button
                className={`px-4 py-4 text-sm font-medium w-full ${isLogin ? "border-b-4 border-c1 text-c1" : "text-gray-900"
                  }`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </div>

            <form className="space-y-4 p-6" onSubmit={handleSubmit}>
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-800"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-800"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </>
              )}

              <div>
                {isLogin && (
                  <h1 className="text-center text-xl mb-1 font-semibold">
                    Distributor Login
                  </h1>
                )}

                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-800"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-800"
                  placeholder="Enter your password"
                  required
                />

                <div class="flex items-center justify-between mb-4 mt-2">
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
              </div>

              {/* Error and Success Messages */}
              {errorMessage && (
                <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
              )}
              {successMessage && (
                <div className="text-green-500 text-sm mt-2">
                  {successMessage}
                </div>
              )}

              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-c1 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-800"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
