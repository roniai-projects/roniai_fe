import axios from "axios";

const CHAT_API_URL = import.meta.env.VITE_API_BASE_URL2;

const setAuthorizationHeader = () => {
  const token = localStorage.getItem("jwtToken");

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

const fetchDataWithToken = async (url) => {
  try {
    setAuthorizationHeader();

    const response = await axios.get(url);
    return {
      data: response.data,
      sessionId: response.data.session_id,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const handleSendMessage = async (userMessage, setChatLog, setUserMessage) => {
  if (userMessage.trim() === "") return;

  try {
    const response = await axios.post(`${CHAT_API_URL}/chat`, {
      query: userMessage,
      sessionId: sessionId,
    });

    const aiResponse = response.data.output_text;

    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { sender: "You", message: userMessage },
      { sender: "AI", message: aiResponse },
    ]);

    console.log("Response data:", response.data);
    setUserMessage("");
  } catch (error) {
    console.error("Error sending message:", error);
    console.error("Server response:", error.response);
  }
};

const handleFileUpload = async (file) => {
  if (
    file.type ===
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    const formData = new FormData();
    formData.append("excelFile", file);

    try {
      setAuthorizationHeader();

      const response = await axios.post(
        `${CHAT_API_URL}/upload_excel`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      console.error("Server response:", error.response);
      throw error;
    }
  } else {
    console.error("Invalid file format. Please upload an Excel file.");
  }
};

export { fetchDataWithToken, handleSendMessage, handleFileUpload };
