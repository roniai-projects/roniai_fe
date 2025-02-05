import React, { useState, useEffect } from "react";
import Login from "./Login";
import AdminNav from "./AdminNav";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL2;

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usersData, setUsersData] = useState([]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const fetchData = async () => {
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await axios.post(
        `${API_BASE_URL}/get_all_users`,
        {
          limit: 100,
          skip: 0,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Beare ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchData().then((data) => {
        setUsersData(data);
      });
    }
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn ? (
        <div className="flex flex-row">
          <AdminNav setIsLoggedIn={handleLogout} />
          <section className="grow m-8">
            <h2 className={title}>Manage Users</h2>

            <div className="overflow-x-auto mt-8 border rounded-xl w-full">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="w-1/4 px-4 py-2">Email</th>
                    <th className="w-1/4 px-4 py-2">First Name</th>
                    <th className="w-1/4 px-4 py-2">Last Name</th>
                    <th className="w-1/4 px-4 py-2 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {usersData.map((user) => (
                    <tr key={user.id}>
                      <td className="w-1/4 px-4 py-1">{user.email}</td>
                      <td className="w-1/4 px-4 py-1">{user.first_name}</td>
                      <td className="w-1/4 px-4 py-1">{user.last_name}</td>
                      <td className="w-1/4 px-4 py-1">
                        <button
                          type="button"
                          className="w-10/12 mx-auto px-2 py-1 rounded-full bg-red-500 text-gray-200 flex items-center justify-center"
                        >
                          <DeleteOutlined style={{ fontSize: "1rem" }} />
                          <span className="ml-1">Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      ) : (
        <Login setIsLoggedIn={handleLogin} />
      )}
    </>
  );
}

const title = "font-semibold mt-2";
