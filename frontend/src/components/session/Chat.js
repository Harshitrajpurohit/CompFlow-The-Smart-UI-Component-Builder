import React, { useRef, useEffect, useState } from "react";

export default function Chat({ chats, setChats, sessionId, setSession, setJsxCode, setCssCode }) {
  const [prompt, setPrompt] = useState("");
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chats]);

  async function handleClick() {
    if (prompt === "") return alert("Add prompt");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_API}/api/session/${sessionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.message);

      setChats((prev) => [...prev, data.newChat]);
      setSession(data.session);
      setJsxCode(data.session.last_jsx)
      setCssCode(data.session.last_css)
      setPrompt("");
    } catch (error) {
      console.log("Internal Error", error);
    }
  }

  return (
    <div className="h-full w-[30vw] min-w-[300px] flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm transition-colors duration-300 overflow-hidden">
      <h2 className="py-3 px-4 text-2xl font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">
        Chat
      </h2>

      <section
        ref={chatRef}
        className="flex-1 py-4 px-3 overflow-y-auto my-scrollbar"
      >
        {chats?.map((chat, idx) => (
          <div key={idx} className="p-3 flex flex-col gap-3">
            <p className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 w-fit max-w-[80%] rounded-lg px-3 py-2 text-sm shadow-sm">
              {chat.prompt}
            </p>
            <p className="bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-100 w-fit max-w-[80%] rounded-lg px-3 py-2 text-sm shadow-sm">
              {chat.explanation}
            </p>
          </div>
        ))}
      </section>

      <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex gap-3 items-center">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          className="flex-1 text-sm py-2 px-3 rounded-lg bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
          placeholder="Type your prompt here..."
        />
        <button
          onClick={handleClick}
          className="py-2 px-4 text-sm font-medium text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
}
