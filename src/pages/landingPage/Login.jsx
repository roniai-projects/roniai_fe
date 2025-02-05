import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// components
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
// assets
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  // states
  const [onboardData, setOnboardData] = useState({});
  const [onboardError, setOnboardError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [inputType, setInputType] = useState("password");
  const [isShown, setIsShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // state changes
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // show password
  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
    setIsShown(!isShown);
  };

  // reroute
  const navigate = useNavigate();

  const goToPage = (path) => {
    navigate(path);
  };


  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: email,
        password: password,
      });

      const token = response.data.token;
      localStorage.setItem("jwtToken", token);

      const url = `${API_BASE_URL}/get_onboarding_info`;
      const onboardResponse = await axios.get(url, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setOnboardData(onboardResponse.data);

      const hasData = (obj) => {
        return Object.keys(obj).some((key) => {
          if (key === "user_id") {
            return false;
          }

          const value = obj[key];
          return (
            (typeof value === "string" && value.trim() !== "") ||
            (Array.isArray(value) && value.length > 0)
          );
        });
      };

      // console.log("Onboard Data:", onboardResponse.data);
      // console.log("Has Data:", hasData(onboardResponse.data));

      setLoading(false);

      if (hasData(onboardResponse.data)) {
        goToPage("/dashboard");
      } else {
        goToPage("/onboard");
      }
    } catch (error) {
      console.error("Error during login or fetching onboarding info:", error);

      setLoading(false);

      if (error.response?.status === 476) {
        goToPage("/onboard");
        return;
      }

      if (error.response?.status === 400) {
        const errorData = error.response.data;
        if (errorData.email) {
          setError(errorData.email);
        } else if (errorData.password) {
          setError(errorData.password);
        } else {
          setError("Invalid email or password");
        }
      }
      if (error.response?.status === 410) {
        const errorData = error.response.data;
        setError(errorData.message);
        goToPage("/login");
      } else if (error.response?.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("An error occurred during login");
      }
    }
  };

  return (
    <>
      {loading ? (
        <div className="h-screen w-screen fixed top-0 left-0 flex flex-col-reverse gap-2 bg-white items-center justify-center z-50">
          <Loader />
        </div>
      ) : (
        <div
          className="relative flex flex-col mx-auto
      "
        >
          {/* navbar */}
          <div className="sticky top-0 z-50 h-0 lg:h-auto xl:h-0">
            <Navbar />
          </div>

          {/* content */}
          <div className="flex flex-col justify-center mx-auto px-4 md:px-28 items-center h-screen grow w-full">
            <form
              onSubmit={handleLogin}
              className="md:px-16 pt-16 md:p-8 lg:py-12 max-w-md lg:w-3/5 flex gap-4 md:gap-6 items-center flex-col md:border md:border-black rounded-xl mt-12 md:mt-0"
            >
              <h1 className="text-3xl font-semibold">Welcome</h1>
              <div className="flex flex-col gap-2">
                <div className="w-full flex flex-col gap-1">
                  <label htmlFor="email" className="text-xs font-semibold">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="w-72 border rounded-lg px-5 py-2 text-xs placeholder:text-xs"
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <label htmlFor="password" className="text-xs font-semibold">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={inputType}
                      value={password}
                      onChange={handlePasswordChange}
                      className="w-72 border rounded-lg px-5 py-2 text-xs placeholder:text-xs"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="right-5 top-0.5 absolute"
                    >
                      {isShown ? (
                        <UnlockOutlined style={{ fontSize: "1rem" }} />
                      ) : (
                        <LockOutlined style={{ fontSize: "1rem" }} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex flex-row w-full justify-between">
                  <div className="flex gap-1 items-center text-xs">
                    <input
                      type="checkbox"
                      name="remember-me"
                      id="remember-me"
                      className="rounded"
                    />
                    <label htmlFor="remember-me">Remember me</label>
                  </div>
                  <a className="text-[#DBC7C8] text-xs ml-1 hover:opacity-80 cursor-pointer">
                    Forgot Password
                  </a>
                </div>
              </div>

              <div className="w-full flex items-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r mx-auto from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded-full px-5 py-2 font-semibold text-sm hover:opacity-80 w-72"
                >
                  Log In
                </button>
              </div>
              {error && <div className="text-red-500 text-xs">{error}</div>}
              <div className="text-xs font-bold">
                Don't have an account?{" "}
                <button
                  onClick={() => goToPage("../register")}
                  className="text-[#DBC7C8] ml-1 hover:opacity-80 cursor-pointer"
                >
                  Create an account
                </button>
              </div>
            </form>
          </div>

          {/* footer */}
          <Footer />
        </div>
      )}
    </>
  );
};

export default Login;
