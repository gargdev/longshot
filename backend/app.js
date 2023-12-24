// server.js

const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const port = 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
