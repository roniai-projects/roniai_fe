// imports
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// components
import Sidebar from "../Sidebar";
import { MenuFoldOutlined } from "@ant-design/icons";
import { ArrowRightOutlined, UploadOutlined } from "@ant-design/icons";
import ChatHistory from "../ChatHistory";

export default function CreateBudget() {
  const { sessionId } = useParams();
  const CHAT_API_URL = import.meta.env.VITE_API_BASE_URL2;
  const [isOpen, setIsOpen] = useState(true);
  const [userMessage, setUserMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isRoniTyping, setIsRoniTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // sidebar-control
  const toggleSidebar = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch and update chat history based on the current URL
    async function fetchChatHistory() {
      try {
        const url = `${CHAT_API_URL}/get_message_history`;
        const token = localStorage.getItem("jwtToken");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Update Content-Type
        };
        const requestData = { limit: 0, session_id: sessionId }; // Data as JSON object

        const response = await axios.post(url, requestData, {
          headers: headers,
        });

        // Assuming response.data.messages is an array containing messages
        const messages = response.data.messages.map((message) => ({
          sender: message.type === "human" ? "You" : "AI",
          message: message.content,
        }));

        setChatLog(messages);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    }

    fetchChatHistory();
  }, [sessionId]); // Run the effect whenever sessionId changes

  // upload file
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const token = localStorage.getItem("jwtToken");

    if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      const formData = new FormData();
      formData.append("file", file, file.name);

      const url = `${CHAT_API_URL}/upload_excel`;

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      try {
        setIsRoniTyping(false);

        const response = await axios.post(url, formData, {
          headers: headers,
        });

        // console.log("Response:", response.data);
        const session_id = response.data.session_id;

        navigate(`./${session_id}`);

        handleSendMessageWithSession(userMessage, session_id);
        setSuccessMessage("File uploaded successfully.");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);

        setIsRoniTyping(false);
      } catch (error) {
        // console.error("Error uploading file:", error);
        // console.error("Server response:", error.response);

        if (error.response && error.response.status === 411) {
          setErrorMessage("Session already exists");

          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
        }
      }
    } else {
      setErrorMessage("Invalid file format.");
    }
  };

  // send message
  const handleSendMessageWithSession = async (userMessage, session_id) => {
    if (userMessage.trim() === "") {
      return;
    }

    try {
      const token = localStorage.getItem("jwtToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { sender: "You", message: userMessage },
      ]);
      setIsRoniTyping(true);
      setUserMessage("");

      const response = await axios.post(
        `${CHAT_API_URL}/chat`,
        {
          query: userMessage,
          session_id: session_id,
        },
        {
          headers: headers,
        }
      );

      const aiResponse = response.data.output_text;

      let typedMessage = "";
      for (let i = 0; i < aiResponse.length; i++) {
        setTimeout(() => {
          typedMessage += aiResponse[i];
          setChatLog((prevChatLog) => {
            const updatedLog = [...prevChatLog];
            if (updatedLog[updatedLog.length - 1]?.sender === "AI") {
              updatedLog[updatedLog.length - 1].message = typedMessage;
            } else {
              updatedLog.push({ sender: "AI", message: typedMessage });
            }
            return updatedLog;
          });
        }, i * 20);
      }

      setUserMessage("");
      setTimeout(() => {
        setIsRoniTyping(false);
      }, aiResponse.length * 20);
    } catch (error) {
      if (
        error.response &&
        error.response.status === 500 &&
        userMessage.trim() !== ""
      ) {
        setChatLog((prevChatLog) => [
          ...prevChatLog,
          {
            sender: "AI",
            message: "Please upload an Excel file first to get started.",
          },
        ]);
      }
      setIsRoniTyping(false);
      setUserMessage("");
    }
  };

  return (
    <div className="flex flex-row relative">
      {!isOpen && (
        <>
          <Sidebar />
          <ChatHistory />
        </>
      )}

      <div className="w-full h-screen bg-gray-50 flex flex-col justify-between">
        <section className="grow w-full overflow-y-auto pb-8 md:pb-0 pt-8 md:pt-12 px-4 md:px-8 lg:px-12">
          <div className="chat-log">
            {chatLog.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "You" ? "justify-end" : "justify-start"
                } mb-2`}
              >
                <div
                  className={`rounded-lg py-2 px-4 text-xs md:text-sm ${
                    message.sender === "You"
                      ? "bg-[#b29ea7] text-white"
                      : "bg-gradient-to-r from-[#f1eaf0] via-white to-[#f1eaf0] text-gray-700 font-semibold"
                  }`}
                >
                  {message.sender === "AI" && isTyping ? (
                    <span>
                      {message.message.split("").map((char, charIndex) => (
                        <span key={charIndex}>
                          {char}
                          {charIndex === message.message.length - 1 && (
                            <span className="animate-pulse">|</span>
                          )}
                        </span>
                      ))}
                    </span>
                  ) : // Check if the message is a list
                  Array.isArray(message.message) ? (
                    <ul className="list-disc pl-4">
                      {message.message.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  ) : Array.isArray(message.message) ? (
                    <ol className="list-decimal pl-4">
                      {message.message.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ol>
                  ) : (
                    // Render regular message
                    message.message
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
        <div className="max-h-28 h-full border-t-2 flex items-center justify-center relative">
          {errorMessage && (
            <p className="text-center text-xs text-red-500 absolute top-0 translate-y-2">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="text-center text-xs text-green-500 absolute top-0 translate-y-2">
              {successMessage}
            </p>
          )}
          {isRoniTyping && !errorMessage && !successMessage && (
            <p className="text-center text-xs text-gray-500 absolute top-0 translate-y-2">
              Roni AI is typing...
            </p>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessageWithSession(userMessage, sessionId);
            }}
            className="mx-auto max-w-2xl w-11/12 md:w-10/12 lg:w-full relative flex flex-col gap-2 mt-4"
          >
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSendMessageWithSession(userMessage, sessionId);
                }
              }}
              placeholder="Type your message..."
              className="w-full rounded-xl text-gray-700 bg-gray-200 px-4 py-2 text-sm border-none focus:ring-[#b29ea7]"
            />

            <input
              type="file"
              id="fileInput"
              accept=".xlsx,.xls"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
            <label
              htmlFor="fileInput"
              className="absolute top-1 right-12 text-gray-700 cursor-pointer"
            >
              <UploadOutlined style={{ fontSize: "1.3rem" }} />
            </label>
            <button
              type="submit"
              className="absolute top-1 right-4 text-gray-700"
            >
              <ArrowRightOutlined style={{ fontSize: "1.3rem" }} />
            </button>

            <p className="text-center text-xs text-gray-500">
              Copyright © 2023 Roni AI. All rights reserved.
            </p>
          </form>
        </div>
      </div>

      <button
        onClick={toggleSidebar}
        className={`fixed opacity-30 hover:opacity-100 -translate-y-1.5 -translate-x-4 flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform border bg-gray-100 rounded-md hover:border-[#DBC7C8] hover:text-[#DBC7C8] ${
          isOpen
            ? "top-10 left-8 md:left-12 rotate-180 transform transition"
            : "top-10 right-0 md:right-auto md:left-64 lg:left-72"
        }`}
      >
        <MenuFoldOutlined />
      </button>
    </div>
  );
}
