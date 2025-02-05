import { useState, useEffect } from "react";
import { PlusOutlined, MessageOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

export default function ChatHistory() {
  const [sessions, setSessions] = useState([]);
  const CHAT_API_URL = import.meta.env.VITE_API_BASE_URL2;

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("jwtToken");

        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          delete axios.defaults.headers.common["Authorization"];
        }

        const response = await axios.get(`${CHAT_API_URL}/get_sessions`);
        console.log("Response data:", response.data);
        setSessions(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const location = useLocation();

  return (
    <aside className="md:flex ml-16 md:ml-0 z-50 flex-col h-screen px-5 py-8 overflow-y-auto bg-gray-50 border-r w-56 md:w-64 fixed md:static">
      <div className="flex flex-col justify-between flex-1">
        <nav className="flex-1 -mx-3 space-y-3">
          <div className="flex flex-row gap-2 justify-between">
            <Link
              to={"/chat-with-roni"}
              className="flex items-center px-3 w-full py-2 text-gray-600 transition-colors duration-300 transform border rounded-md hover:border-[#DBC7C8] hover:text-[#DBC7C8]"
            >
              <PlusOutlined />
              <span className="mx-2 text-sm font-medium">Chat with Roni</span>
            </Link>
          </div>

          <div className="space-y-1">
            {sessions.map((session, index) => (
              <Link
                key={index}
                className={`flex items-center px-4 py-3 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-[#DBC7C8] hover:text-white ${
                  location.pathname === `/chat-with-roni/${session.session_id}`
                    ? "bg-[#DBC7C8] text-white"
                    : ""
                }`}
                to={`/chat-with-roni/${session.session_id}`}
              >
                <MessageOutlined />
                <span className="mx-2 text-sm font-medium truncate">
                  {session.filename}{" "}
                </span>{" "}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
}
