import { useState, useEffect } from "react";

const Chat = () => {
  const examples = [
    "How To Use Tailwind CSS",
    "How To Use Tailwind CSS with React js",
    "How To Use Tailwind CSS with Next js",
    "How To Use Tailwind CSS with Gatsby",
    "How To Use Tailwind CSS with Svelte",
    "How To Use Tailwind CSS with Vue",
    "How To Use Tailwind CSS with Angular",
    "How To Use Tailwind CSS with Angular",
  ];

  const [chat, setChat] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [title, setTitle] = useState([]);
  const [input, setInput] = useState([]);

  console.log(chatHistory, "chatHistory");

  const handleSend = async () => {
    if (input.trim()) {
      setChat([...chat, { role: "user", content: input }]);
      setInput("");

      try {
        const response = await fetch("http://localhost:8080/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: input,
          }),
        });

        if (response.ok) {
          const responseData = await response.json();
          const generatedContent = responseData.messages[0].content;

          setChat([...chat, { role: "assistant", content: generatedContent }]);
        } else {
          console.error("Failed to send message to the backend");
          const errorData = await response.json();
          console.error("Error details:", errorData);
        }
      } catch (error) {
        console.error("Error sending message to the backend:", error);
      }
      if (!title) {
        const createTitle = await fetch("http://localhost:8080/api/title", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: input,
          }),
        });

        const title = await createTitle.json();
        setTitle(title?.title);
        setChatHistory([...chatHistory, title]);
      }
    }
  };

  const handleDeleteChatHistory = async (index) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/delete-chat-history",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ index }),
        }
      );

      if (response.ok) {
        const updatedChatHistory = [...chatHistory];
        updatedChatHistory.splice(index, 1);
        setChatHistory(updatedChatHistory);
      } else {
        console.error("Failed to delete chat history");
      }
    } catch (error) {
      console.error("Error deleting chat history:", error);
    }
  };

  const fetchChatHistory = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/chat-history");
      if (response.ok) {
        const chatHistoryData = await response.json();
        setChatHistory(chatHistoryData);
      } else {
        console.error("Failed to fetch chat history");
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  // Fetch chat history when the component mounts
  useEffect(() => {
    fetchChatHistory();
  }, []);

  return (
    <div className="w-screen h-screen bg-[#050509] flex">
      <div className="w-[20%] h-screen bg-[#0c0c15] text-white p-4">
        <div className="h-5%">
          <button
            className="w-full h-[50px] text-white border rounded hover:bg-slate-600"
            onClick={() => {
              setChat([]);
              setTitle("");
            }}
          >
            + New Chat
          </button>
        </div>
        <div className="h-[75%] overflow-scroll shadow-lg hide-scroll-bar mb-4">
          {chatHistory.map((item, index) => (
            <div className="py-3 text-center rounded mt-4 text-lg font-light flex items-center px-8 hover:bg-slate-600 cursor-pointer">
              <span className="mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-message-2"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M8 9h8" />
                  <path d="M8 13h6" />
                  <path d="M9 18h-3a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-3l-3 3l-3 -3z" />
                </svg>
              </span>
              <span className="text-left">{item.title}</span>
              <button
                className="ml-auto text-white"
                onClick={() => handleDeleteChatHistory(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-trash-off"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 3l18 18" />
                  <path d="M4 7h3m4 0h9" />
                  <path d="M10 11l0 6" />
                  <path d="M14 14l0 3" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l.077 -.923" />
                  <path d="M18.384 14.373l.616 -7.373" />
                  <path d="M9 5v-1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[80%]">
        {chat.length > 0 ? (
          <div className="h-[80%] overflow-scroll hide-scroll-bar pt-8">
            {chat.map((item, index) => (
              <div
                className={`w-[60%] text-white mx-auto p-4 text-white flex ${
                  item.role === "assistant" && "bg-slate-900 rounded"
                }`}
              >
                <span className="mr-8 p-3 bg-slate-500 text-white rounded-full h-full">
                  {item.role === "user" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-user-bolt"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                      <path d="M6 21v-2a4 4 0 0 1 4 -4h4c.267 0 .529 .026 .781 .076" />
                      <path d="M19 16l-2 3h4l-2 3" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-robot"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M6 4m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
                      <path d="M12 2v2" />
                      <path d="M9 12v9" />
                      <path d="M15 12v9" />
                      <path d="M5 16l4 -2" />
                      <path d="M15 14l4 2" />
                      <path d="M9 18h6" />
                      <path d="M10 8v.01" />
                      <path d="M14 8v.01" />
                    </svg>
                  )}
                </span>
                <div
                  className="leading-loose"
                  style={{ whiteSpace: "break-spaces" }}
                >
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[80%] flex text-white flex-col justify-center items-center">
            <div className="text-4xl font-bold mb-8">APP GPT</div>
            <div className="flex flex-wrap justify-around max-w-[900px]">
              {examples.map((item, index) => (
                <div
                  className="text-lg font-light mt-4 p-4 min-w-[400px] border rounded cursor-pointer hover:bg-slate-800"
                  onClick={() => setInput(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="h-[20%]">
          <div className="flex flex-col items-center w-full h-full justify-center text-white">
            <div className="w-[60%] flex justify-center relative">
              <input
                type="text"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                className="w-full rounded-lg p-4 pr-16 bg-slate-800 text-white"
                placeholder="Type your message here..."
              />
              <span
                className="absolute right-4 top-4 cursor-pointer"
                onClick={() => (input.trim() ? handleSend() : undefined)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-send"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 14l11 -11" />
                  <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
                </svg>
              </span>
            </div>
            <small className="text-slate-500 mt-2 text-lg">
              AI Can generate incorrect information
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
