import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MessageHistory() {
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem("jwtToken");
  const CHAT_API_URL = import.meta.env.VITE_API_BASE_URL2;

  useEffect(() => {
    const url = `${CHAT_API_URL}/get_message_history/${sessionId}`;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    const data = {
      limit: 0,
      session_id: "excel-data-2ffb772f-ab82-4fad-98cc-d76019228080",
    };
    // Make the Axios request here
    const fetchData = async () => {
      try {
        const response = await axios.post(url, headers, data);
        setMessages(response.data.messages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [sessionId]);

  return (
    <div>
      <h1>Message History</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index} className={message.type}>
            {message.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
