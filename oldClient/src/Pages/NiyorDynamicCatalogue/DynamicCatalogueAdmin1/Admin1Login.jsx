import React, { useState, useEffect } from "react";
import axios from "axios";
import dummylogo from "../../../assets/dummylogo.png";
import { useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";

const Admin1Login = () => {
  const [userName, setuserName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);
  const [token, setToken] = useState(null);

  const { decodedToken } = useJwt(token);

  useEffect(() => {
    if (decodedToken) {
      console.log("Decoded Token:", decodedToken);
      const userId = decodedToken.userId;
      window.location.href = `https://test.profilegenie.in/admin/1/Ishan_Niyor_Perfumes`

    }
  }, [decodedToken, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowLoader(true);
    try {
      const response = await axios.post(
        "https://api.profilegenie.in/api/client/login",
        {
          userName,
          password,
        }
      );

      if (response.status === 200) {
        const token = response.data.token;
        setShowLoader(false);
        localStorage.setItem("token", token);
        setToken(token);
        window.location.href = `https://test.profilegenie.in/admin/1/Ishan_Niyor_Perfumes`
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          setError("Login Details Are Wrong!!");
          setShowLoader(false);
        } else if (status === 500) {
          console.log("Server error:", error.response.data);
        } else {
          console.error("Login error:", status);
          setShowLoader(false);
        }
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center px-10 py-10 bg-white border border-2 border-black rounded-lg shadow-lg">
        <div className="text-center sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img className="w-auto h-10 mx-auto" src={dummylogo} alt="Your Company" /> */}
          <h2 className="mt-2 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                User Name
              </label>
              <div className="mt-2">
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  autoComplete="username"
                  required
                  value={userName}
                  onChange={(e) => setuserName(e.target.value)}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      aria-describedby="remember"
                      id="check"
                      type="checkbox"
                      value={showPassword}
                      onChange={() => setShowPassword((prev) => !prev)}
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 ">
                      Show password
                    </label>
                  </div>
                </div>
                {/* <a href="#" class="text-sm font-medium text-primary-600 hover:underline ">Forgot password?</a> */}
              </div>
            </div>

            {error && <div className="text-sm text-red-500">{error}</div>}

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2C1E4A] bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-900"
            >
              {" "}
              {showLoader ? (
                <svg
                  aria-hidden="true"
                  className="inline w-4 h-4 text-gray-200 animate-spin fill-blue-600"
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
                <span className="relative z-10">Login</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin1Login;
