// server.js

const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// Array to store chat history (for simplicity; in a production environment, you might want to use a database)
let chatHistory = [];

// File path for chat history
const chatHistoryKey = "chatHistory";

// Load chat history from local storage when the server starts
const loadChatHistoryFromLocalStorage = () => {
  try {
    const storedChatHistory = localStorage.getItem(chatHistoryKey);
    if (storedChatHistory) {
      chatHistory = JSON.parse(storedChatHistory);
      console.log("Chat history loaded from local storage");
    }
  } catch (error) {
    console.error("Error loading chat history from local storage:", error);
  }
};

// Save chat history to local storage
const saveChatHistoryToLocalStorage = () => {
  try {
    localStorage.setItem(chatHistoryKey, JSON.stringify(chatHistory));
    console.log("Chat history saved to local storage");
  } catch (error) {
    console.error("Error saving chat history to local storage:", error);
  }
};

// Endpoint to get chat history
app.get("/api/chat-history", (req, res) => {
  res.json(chatHistory);
});

// Endpoint to delete chat history at a specific index
app.post("/api/delete-chat-history", (req, res) => {
  const { index } = req.body;

  if (index >= 0 && index < chatHistory.length) {
    // Remove the message at the specified index
    chatHistory.splice(index, 1);

    // Save chat history to local storage
    saveChatHistoryToLocalStorage();

    res.status(200).json({ message: "Chat history deleted successfully" });
  } else {
    res.status(400).json({ message: "Invalid index" });
  }
});

// ... (previous code)

// Load chat history from local storage when the server starts
loadChatHistoryFromLocalStorage();

// Save chat history to local storage periodically (every 5 minutes in this example)
setInterval(saveChatHistoryToLocalStorage, 5 * 60 * 1000);

app.post("/api/chat", async (req, res) => {
  const { text } = req.body;

  try {
    const response = await fetch(
      "https://api-v2.longshot.ai/custom/api/generate/instruct",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.LONGSHOT_API_KEY}`,
        },
        body: JSON.stringify({
          text: text,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    const generatedContent = responseData.copies[0]?.content || "";

    const assistantMessage = {
      role: "assistant",
      content: generatedContent,
    };

    // Add the assistant message to the chat history
    chatHistory.push(assistantMessage);

    // Save chat history to local storage
    saveChatHistoryToLocalStorage();

    res.json({
      messages: [assistantMessage],
      status: responseData.status,
      message: responseData.message,
      creditsUsed: responseData.credits_used,
    });
  } catch (error) {
    console.error("Error sending message to the backend:", error);
    console.error("Stack Trace:", error.stack);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
});

app.post("/api/title", async (req, res) => {
  try {
    const { title } = req.body;
    const response = await fetch(
      "https://api-v2.longshot.ai/custom/api/generate/instruct",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.LONGSHOT_API_KEY}`,
        },
        body: JSON.stringify({
          text: `Write a title for the following article ${title}`,
        }),
      }
    );
    const data = await response.json();
    console.log(data, "data");
    res.status(200).json({ title: data?.choices?.[0]?.text });
  } catch (error) {
    console.log(error, "error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
