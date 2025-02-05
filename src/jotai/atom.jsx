import { atom } from "jotai";
import axios from "axios";

const userDataAtom = atom(null);

const fetchData = async () => {
  try {
    const response = await axios.post(
      "https://roni-ai-app.com/chat-api/get_all_users",
      {
        limit: 5,
        skip: 0,
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer YOUR_ACCESS_TOKEN",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
