import Sidebar from "../../components/Sidebar";
// import germee from "../../assets/germee.jpeg";
import user from "../../assets/user.png";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updatePersonalInfo } from "../../redux/userReducer";
import { getUserDetails } from "../../redux/userReducer";
// import { updateCompanyInfo } from "../../redux/companyReducer ";
// import { getCompanyDetails } from "../../redux/companyReducer ";
import { useCompanyContext } from "../../context/CompanyProvider";
import { updateProductInfo } from "../../redux/productReducer";
import { getProductDetails } from "../../redux/productReducer";
import axios from "axios";

// assets
import logo from "../../assets/logo.png";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Settings = () => {
  const { companyDetails, selectedCompany } = useCompanyContext();
  const [onboardData, setOnboardData] = useState([]);
  const userData = useSelector((state) => state.user);
  // const companyData = useSelector((state) => state.company);
  const productData = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [isEditingUser, setIsEditingUser] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({
    email: userData.email,
    first_name: userData.first_name,
    last_name: userData.last_name,
    password: userData.password,
    position: userData.position,
  });

  // console.log(companyDetails);
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [updatedCompanyDetails, setUpdatedCompanyDetails] = useState({
    company_name: companyDetails?.company_name || "",
    company_address: companyDetails?.company_address || "",
    industry: companyDetails?.industry || "",
    tech_startup: companyDetails?.tech_startup || true,
    website: companyDetails?.website || "",
  });

  useEffect(() => {
    // Update updatedCompanyDetails whenever companyDetails changes
    setUpdatedCompanyDetails({
      company_name: companyDetails?.company_name || "",
      company_address: companyDetails?.company_address || "",
      industry: companyDetails?.industry || "",
      tech_startup:
        companyDetails?.tech_startup !== undefined
          ? companyDetails.tech_startup
          : true,
      website: companyDetails?.website || "",
    });
    console.log(companyDetails);
  }, [companyDetails]);

  const updateCompany = async () => {
    const url = `${API_BASE_URL}/company/${selectedCompany}`;
    const token = localStorage.getItem("jwtToken");

    const data = {
      company_address: updatedCompanyDetails.company_address || "",
      company_name: updatedCompanyDetails.company_name || "",
      industry: updatedCompanyDetails.industry || "",
      tech_startup: updatedCompanyDetails.tech_startup,
      website: updatedCompanyDetails.website || "",
    };

    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      await axios.put(url, data, { headers });
      setIsEditingCompany(false);
      alert("Company data updated!");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [updatedProductData, setUpdatedProductData] = useState({
    products: productData.products,
    services: productData.services,
    total_no_products: productData.total_no_products,
  });

  const handleUpdateUserInfo = () => {
    dispatch(updatePersonalInfo(updatedUserData));
    setIsEditingUser(false);
    dispatch(getUserDetails());
  };

  // const handleUpdateCompanyInfo = () => {
  //   dispatch(updateCompanyInfo(updatedCompanyData));
  //   setIsEditingCompany(false);
  //   dispatch(getCompanyDetails());
  // };

  const handleUpdateProductInfo = () => {
    dispatch(updateProductInfo(updatedProductData));
    setIsEditingProduct(false);
    dispatch(getProductDetails());
  };

  useEffect(() => {
    dispatch(getUserDetails());
    // dispatch(getCompanyDetails());
    dispatch(getProductDetails());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${API_BASE_URL}/get_onboarding_info`;
        const token = localStorage.getItem("jwtToken");
        const onboardResponse = await axios.get(url, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setOnboardData(onboardResponse.data);
        // console.log("Response Data:", onboardResponse.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-row bg-gray-50 h-screen">
      <Sidebar />
      <div className={layout}>
        {/* Title */}
        <h3 className={title}>Settings</h3>

        <div className={itemList}>
          {/* Profile Information */}
          <div className={item}>
            <p className="font-semibold uppercase">Personal Information </p>
            <div className="border-b border-black w-full" />
            <div className="w-fit h-fit relative">
              <img
                className="object-cover rounded-full border-2 border-gray-300 h-24 w-24 my-2"
                src={user}
                alt="avatar"
              />
            </div>
            <div className="grid grid-cols-1 w-full gap-2 text-sm">
              <div className="flex flex-col w-full md:flex-row gap-1 md:items-center">
                <p className="font-semibold">First Name:</p>
                {isEditingUser ? (
                  <input
                    type="text"
                    className="text-sm border-none bg-gray-100 px-3 py-2 flex-1 flex"
                    value={updatedUserData.first_name}
                    onChange={(e) =>
                      setUpdatedUserData({
                        ...updatedUserData,
                        first_name: e.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="flex-1 px-3 py-2 bg-gray-100 rounded flex max-h-8 h-8 text-sm">
                    {userData.first_name ? (
                      <>{userData.first_name}</>
                    ) : onboardData.first_name ? (
                      <>{onboardData.first_name}</>
                    ) : (
                      <p>No Data</p>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col w-full md:flex-row gap-1 md:items-center">
                <p className="font-semibold">Last Name:</p>
                {isEditingUser ? (
                  <input
                    type="text"
                    className="text-sm border-none bg-gray-100 px-3 py-2 flex-1 flex"
                    value={updatedUserData.last_name}
                    onChange={(e) =>
                      setUpdatedUserData({
                        ...updatedUserData,
                        last_name: e.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="flex-1 px-3 py-2 bg-gray-100 rounded flex max-h-8 h-8 text-sm">
                    {userData.last_name ? (
                      <>{userData.last_name}</>
                    ) : onboardData.last_name ? (
                      <>{onboardData.last_name}</>
                    ) : (
                      <p>No Data</p>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col w-full md:flex-row gap-1 md:items-center">
                <p className="font-semibold">Email Address:</p>
                {isEditingUser ? (
                  <input
                    type="text"
                    className="text-sm border-none bg-gray-100 px-3 py-2 flex-1 flex"
                    value={updatedUserData.email}
                    onChange={(e) =>
                      setUpdatedUserData({
                        ...updatedUserData,
                        email: e.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="flex-1 px-3 py-2 bg-gray-100 rounded flex max-h-8 h-8 text-sm">
                    {userData.email ? <>{userData.email}</> : <p>No data</p>}
                  </div>
                )}
              </div>
              <div className="flex flex-col w-full md:flex-row gap-1 md:items-center">
                <p className="font-semibold">Password:</p>
                {isEditingUser ? (
                  <input
                    type="password"
                    className="text-sm border-none bg-gray-100 px-3 py-2 flex-1 flex"
                    value={updatedUserData.password}
                    onChange={(e) =>
                      setUpdatedUserData({
                        ...updatedUserData,
                        password: e.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="flex-1 px-3 py-2 bg-gray-100 rounded flex max-h-8 h-8 text-sm">
                    ******
                  </div>
                )}
              </div>
              <div className="flex flex-col w-full md:flex-row gap-1 md:items-center">
                <p className="font-semibold">Position:</p>
                {isEditingUser ? (
                  <input
                    type="text"
                    className="text-sm border-none bg-gray-100 px-3 py-2 flex-1 flex"
                    value={updatedUserData.position}
                    onChange={(e) =>
                      setUpdatedUserData({
                        ...updatedUserData,
                        position: e.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="flex-1 px-3 py-2 bg-gray-100 rounded flex max-h-8 h-8 text-sm">
                    {userData.position ? (
                      <>{userData.position}</>
                    ) : (
                      <p>No data</p>
                    )}
                  </div>
                )}
              </div>
              {!isEditingUser ? (
                <button
                  className="ml-auto mt-2 text-sm rounded px-6 py-1.5 text-white font-semibold bg-[#302e2f] flex flex-1 items-center w-fit self-end gap-1.5"
                  onClick={() => setIsEditingUser(true)}
                >
                  <span>Edit</span>{" "}
                </button>
              ) : (
                <button
                  className="ml-auto mt-2 text-sm rounded px-4 py-1.5 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] font-semibold flex flex-1 items-center w-fit self-end gap-1.5"
                  onClick={handleUpdateUserInfo}
                >
                  <span>Update</span>
                </button>
              )}
            </div>
          </div>

          {/* Company Information */}
          <div className={item}>
            <p className="font-semibold uppercase">Company Information</p>
            <div className="border-b border-black w-full" />
            <div className="w-fit h-fit relative">
              <img
                className="object-cover rounded-full border-2 border-gray-300 h-24 w-24 my-2"
                src={logo}
                alt="company-logo"
              />{" "}
            </div>
            <div className="grid grid-cols-1 w-full gap-2 text-sm">
              <div className="flex flex-col w-full md:flex-row gap-1 md:items-center">
                <p className="font-semibold">Company Name:</p>
                {isEditingCompany ? (
                  <input
                    type="text"
                    className="text-sm border-none bg-gray-100 px-3 py-2 flex-1 flex"
                    value={updatedCompanyDetails.company_name}
                    onChange={(e) =>
                      setUpdatedCompanyDetails({
                        ...updatedCompanyDetails,
                        company_name: e.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="flex-1 px-3 py-2 bg-gray-100 rounded flex max-h-8 h-8 text-sm">
                    {companyDetails && companyDetails.company_name ? (
                      <>{companyDetails.company_name}</>
                    ) : (
                      <p>No data</p>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col w-full md:flex-row gap-1 md:items-center">
                <p className="font-semibold">Company Address:</p>
                {isEditingCompany ? (
                  <input
                    type="text"
                    className="text-sm border-none bg-gray-100 px-3 py-2 flex-1 flex"
                    value={updatedCompanyDetails.company_address}
                    onChange={(e) =>
                      setUpdatedCompanyDetails({
                        ...updatedCompanyDetails,
                        company_address: e.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="flex-1 px-3 py-2 bg-gray-100 rounded flex max-h-8 h-8 text-sm">
                    {companyDetails && companyDetails.company_address ? (
                      <>{companyDetails.company_address}</>
                    ) : (
                      <p>No data</p>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col w-full md:flex-row gap-1 md:items-center">
                <p className="font-semibold">Website:</p>
                {isEditingCompany ? (
                  <input
                    type="text"
                    className="text-sm border-none bg-gray-100 px-3 py-2 flex-1 flex"
                    value={updatedCompanyDetails.website}
                    onChange={(e) =>
                      setUpdatedCompanyDetails({
                        ...updatedCompanyDetails,
                        website: e.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="flex-1 px-3 py-2 bg-gray-100 rounded flex max-h-8 h-8 text-sm">
                    {companyDetails && companyDetails.website ? (
                      <>{companyDetails.website}</>
                    ) : (
                      <p>No data</p>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col w-full md:flex-row gap-1 md:items-center">
                <p className="font-semibold">Are you a tech startup?</p>
                {isEditingCompany ? (
                  <select
                    className="text-sm border-none bg-gray-100 px-3 py-2 flex-1"
                    value={updatedCompanyDetails.tech_startup.toString()}
                    onChange={(e) => {
                      console.log("Selected value:", e.target.value);
                      setUpdatedCompanyDetails({
                        ...updatedCompanyDetails,
                        tech_startup: e.target.value === "true",
                      });
                    }}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                ) : (
                  <div className="flex-1 px-3 py-2 bg-gray-100 rounded flex max-h-8 h-8 text-sm">
                    {updatedCompanyDetails?.tech_startup ? "Yes" : "No"}
                  </div>
                )}
              </div>
              <div className="flex flex-col w-full md:flex-row gap-1 md:items-center">
                <p className="font-semibold">What industry do you belong?</p>
                {isEditingCompany ? (
                  // <input
                  //   type="text"
                  //   className="text-sm border-none bg-gray-100 px-3 py-2 flex-1 flex"
                  //   value={updatedCompanyDetails.industry}
                  //   onChange={(e) =>
                  //     setUpdatedCompanyDetails({
                  //       ...updatedCompanyDetails,
                  //       industry: e.target.value,
                  //     })
                  //   }
                  // />

                  <select
                    className="text-sm border-none bg-gray-100 px-3 py-2 flex-1 flex"
                    onChange={(e) =>
                      setUpdatedCompanyDetails({
                        ...updatedCompanyDetails,
                        industry: e.target.value,
                      })
                    }
                    value={updatedCompanyDetails.industry}
                  >
                    <option value="Advertising">Advertising</option>
                    <option value="Aerospace">Aerospace</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Clothing Industry">Clothing Industry</option>
                    <option value="Computer">Computer</option>
                    <option value="Construction">Construction</option>
                    <option value="Distribution">Distribution</option>
                    <option value="Economics">Economics</option>
                    <option value="Education">Education</option>
                    <option value="Energy">Energy</option>
                    <option value="Entrepreneurship">Entrepreneurship</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Financial Services">
                      Financial Services
                    </option>
                    <option value="Finance">Finance</option>
                    <option value="Fishery">Fishery</option>
                    <option value="Food Industry">Food Industry</option>
                    <option value="Food Service">Food Service</option>
                    <option value="Forestry">Forestry</option>
                    <option value="Health care">Health care</option>
                    <option value="Hospitality Industry">
                      Hospitality Industry
                    </option>
                    <option value="Humnan Resources">Human Resources</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Investment">Investment</option>
                    <option value="Management">Management</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Media">Media</option>
                    <option value="Mining">Mining</option>
                    <option value="Pharmaceutics">Pharmaceutics</option>
                    <option value="Production">Production</option>
                    <option value="Public Administration">
                      Public Administration
                    </option>
                    <option value="Real State">Real State</option>
                    <option value="Retail">Retail</option>
                    <option value="Small Business">Small Business</option>
                    <option value="Technology">Technology</option>
                    <option value="Telecommunications">
                      Telecommunications
                    </option>
                    <option value="Trade">Trade</option>
                    <option value="Transport">Transport</option>
                    <option value="Warehouse">Warehouse</option>
                  </select>
                ) : (
                  <div className="flex-1 px-3 py-2 bg-gray-100 rounded flex max-h-8 h-8 text-sm">
                    {companyDetails && companyDetails.industry ? (
                      <>{companyDetails.industry}</>
                    ) : (
                      <p>No data</p>
                    )}
                  </div>
                )}
              </div>

              {!isEditingCompany ? (
                <button
                  className="ml-auto mt-2 text-sm rounded px-6 py-1.5 text-white font-semibold bg-[#302e2f] flex flex-1 items-center w-fit self-end gap-1.5"
                  onClick={() => setIsEditingCompany(true)}
                >
                  <span>Edit</span>{" "}
                </button>
              ) : (
                <button
                  className="ml-auto mt-2 text-sm rounded px-4 py-1.5 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] font-semibold flex flex-1 items-center w-fit self-end gap-1.5"
                  onClick={updateCompany}
                >
                  <span>Update</span>
                </button>
              )}
            </div>
          </div>

          {/* Product Information */}
          <div className={item}>
            <p className="font-semibold uppercase">Product Information</p>
            <div className="border-b border-black w-full mb-4" />
            <div className="grid grid-cols-1 w-full gap-2 text-sm">
              <div className="flex flex-col w-full md:flex-row gap-1 md:items-center">
                <p className="font-semibold">What are your products?</p>
                {isEditingProduct ? (
                  <input
                    type="text"
                    className="text-sm border-none bg-gray-100 px-3 py-2 flex-1 flex"
                    value={updatedProductData.products}
                    onChange={(e) =>
                      setUpdatedProductData({
                        ...updatedProductData,
                        products: e.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="flex-1 px-3 py-2 bg-gray-100 rounded flex max-h-8 h-8 text-sm">
                    {productData.products ? (
                      <>{productData.products}</>
                    ) : (
                      <p>No data</p>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col w-full md:flex-row gap-1 md:items-center">
                <p className="font-semibold">What are your services?</p>
                {isEditingProduct ? (
                  <input
                    type="text"
                    className="text-sm border-none bg-gray-100 px-3 py-2 flex-1 flex"
                    value={updatedProductData.services}
                    onChange={(e) =>
                      setUpdatedProductData({
                        ...updatedProductData,
                        services: e.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="flex-1 px-3 py-2 bg-gray-100 rounded flex max-h-8 h-8 text-sm">
                    {productData.services ? (
                      <>{productData.services}</>
                    ) : (
                      <p>No data</p>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col w-full md:flex-row gap-1 md:items-center">
                <p className="font-semibold">How many products do you have?</p>
                {isEditingProduct ? (
                  <input
                    type="text"
                    className="text-sm border-none bg-gray-100 px-3 py-2 flex-1 flex"
                    value={updatedProductData.total_no_products}
                    onChange={(e) =>
                      setUpdatedProductData({
                        ...updatedProductData,
                        total_no_products: e.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="flex-1 px-3 py-2 bg-gray-100 rounded flex max-h-8 h-8 text-sm">
                    {productData.total_no_products ? (
                      <>{productData.total_no_products}</>
                    ) : (
                      <p>No data</p>
                    )}
                  </div>
                )}
              </div>
              {!isEditingProduct ? (
                <button
                  className="ml-auto mt-2 text-sm rounded px-6 py-1.5 text-white font-semibold bg-[#302e2f] flex flex-1 items-center w-fit self-end gap-1.5"
                  onClick={() => setIsEditingProduct(true)}
                >
                  <span>Edit</span>{" "}
                </button>
              ) : (
                <button
                  className="ml-auto mt-2 text-sm rounded px-4 py-1.5 bg-gradient-to-r from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] font-semibold flex flex-1 items-center w-fit self-end gap-1.5"
                  onClick={handleUpdateProductInfo}
                >
                  <span>Update</span>
                </button>
              )}
            </div>
          </div>

          {/* Bank and Cards */}
          <div className={item}>
            <p className="font-semibold uppercase">Banks And Cards</p>
            <div className="border-b border-black w-full mb-4" />
            <div className="flex flex-1 items-center justify-center">
              <p>
                No data.{" "}
                <a href="#" className="text-[#DBC7C8]">
                  Link Card?
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

// Styles

const title = "font-semibold mt-2";

const layout =
  "w-full px-5 py-8 overflow-y-auto h-screen bg-gray-50 flex flex-col space-y-8";

const itemList = "grid gap-5 text-sm text-gray-600";

const item =
  "p-4 bg-white rounded-xl shadow-md flex flex-col items-center gap-1";
