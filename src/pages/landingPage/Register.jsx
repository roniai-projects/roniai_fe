import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// components
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
// assets
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import check from "../../assets/check.png";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Register = () => {
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [inputType, setInputType] = useState("password");
  const [inputType2, setInputType2] = useState("password");
  const [isShown, setIsShown] = useState(false);
  const [isShown2, setIsShown2] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // state changes
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordChange2 = (e) => {
    setPassword2(e.target.value);
  };

  // show password
  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
    setIsShown(!isShown);
  };
  const togglePasswordVisibility2 = () => {
    setInputType2(inputType2 === "password" ? "text" : "password");
    setIsShown2(!isShown2);
  };

  // reroute
  const navigate = useNavigate();

  const goToPage = (path) => {
    navigate(path);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !password2) {
      setError("Please fill in all fields.");
      return;
    } else if (password !== password2) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/create_account`, {
        email: email,
        password: password,
      });

      // console.log(response.data);
      setIsRegistered(true);
    } catch (error) {
      if (error.response && error.response.status === 474) {
        setError("An account with this email already exists.");
      } else {
        setError("Registration failed. Please try again later.");
      }
    }
  };

  return (
    <div
      className="relative flex flex-col mx-auto
      "
    >
      {/* navbar */}
      <div className="sticky top-0 z-50 h-0 lg:h-auto xl:h-0">
        <Navbar />
      </div>

      {/* content */}
      {isRegistered ? (
        <div className="flex flex-col justify-center mx-auto px-4 md:px-28 items-center h-screen grow w-full">
          <div className="md:px-16 pt-16 md:p-8 lg:py-12 max-w-md lg:w-3/5 flex gap-4 md:gap-6 items-center flex-col md:border md:border-black rounded-xl mt-12 md:mt-0 text-center">
            <img
              src={check}
              alt="success"
              className="w-20 h-20 md:w-24 md:h-24 animate-pulse"
            />
            <h1 className="text-3xl font-semibold">Success!</h1>
            <p className="text-sm md:text-base ">
              You have successfully created an account.{" "}
              <a
                onClick={() => goToPage("/login")}
                className="text-[#DBC7C8] ml-1 hover:opacity-80 cursor-pointer underline"
              >
                Login
              </a>{" "}
              to your account.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center mx-auto px-4 md:px-28 items-center h-screen grow w-full">
          <form
            onSubmit={handleRegister}
            className="md:px-16 pt-16 md:p-8 lg:py-12 max-w-md lg:w-2/5 flex gap-4 md:gap-6 items-center flex-col md:border md:border-black rounded-xl mt-12 md:mt-0"
          >
            <h1 className="text-3xl font-semibold">Create an account</h1>
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
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="password2" className="text-xs font-semibold">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    id="password2"
                    type={inputType2}
                    value={password2}
                    onChange={handlePasswordChange2}
                    className="w-72 border rounded-lg px-5 py-2 text-xs placeholder:text-xs"
                    placeholder="Re-enter your password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility2}
                    className="right-5 top-0.5 absolute"
                  >
                    {isShown2 ? (
                      <UnlockOutlined style={{ fontSize: "1rem" }} />
                    ) : (
                      <LockOutlined style={{ fontSize: "1rem" }} />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full flex items-center">
              <button
                type="submit"
                className="bg-gradient-to-r mx-auto from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded-full px-5 py-2 font-semibold text-sm hover:opacity-80 w-72"
              >
                Register
              </button>
            </div>
            {error && <div className="text-red-500 text-xs">{error}</div>}
            <div className="text-xs font-bold">
              Already have an account?{" "}
              <a
                onClick={() => goToPage("/login")}
                className="text-[#DBC7C8] ml-1 hover:opacity-80 cursor-pointer"
              >
                Login instead
              </a>
            </div>
          </form>
        </div>
      )}

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Register;
