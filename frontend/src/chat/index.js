import { useState } from "react";

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

  // Move the useState hook here
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState([]);

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

          setChat([
            ...chat,
            { role: "assistant", content: generatedContent },
          ]);
        } else {
          console.error("Failed to send message to the backend");
          const errorData = await response.json();
          console.error("Error details:", errorData);
        }
      } catch (error) {
        console.error("Error sending message to the backend:", error);
      }
    }
  };
  return (
    <div className="w-screen h-screen bg-[#050509] flex">
      <div className="w-[20%] h-screen bg-[#0c0c15] text-white p-4">
        <div className="h-5%">
          <button className="w-full h-[50px] text-white border rounded hover:bg-slate-600">
            + New Chat
          </button>
        </div>
        <div className="h-[75%] overflow-scroll shadow-lg hide-scroll-bar mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(
            (item, index) => (
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
                My Chat History
              </div>
            )
          )}
        </div>
        <div className="overflow-scroll shadow-lg hide-scroll-bar h-[15%] border-t">
          {[1, 2, 3].map((item, index) => (
            <div className="py-3 text-center rounded mt-4 text-lg font-light flex items-center px-8 hover:bg-slate-600 cursor-pointer">
              <span className="mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-settings-code"
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
                  <path d="M11.482 20.924a1.666 1.666 0 0 1 -1.157 -1.241a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.312 .318 1.644 1.794 .995 2.697" />
                  <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                  <path d="M20 21l2 -2l-2 -2" />
                  <path d="M17 17l-2 2l2 2" />
                </svg>
              </span>
              Settings
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
                <div className="leading-loose">{item.content}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[80%] flex text-white flex-col justify-center items-center">
            <div className="text-4xl font-bold mb-8">APP GPT</div>
            <div className="flex flex-wrap justify-around max-w-[900px]">
              {examples.map((item, index) => (
                <div className="text-lg font-light mt-4 p-4 min-w-[400px] border rounded cursor-pointer hover:bg-slate-800" onClick={()=>setInput(item)}>
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
