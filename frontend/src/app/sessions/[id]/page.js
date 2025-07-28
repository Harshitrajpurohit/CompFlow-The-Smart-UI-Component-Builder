"use client";

import { SandpackPreview, SandpackProvider } from "@codesandbox/sandpack-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Chat from "@/components/session/Chat";
import Code from "@/components/session/Code";

export default function Page() {
  const [session, setSession] = useState(null);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [jsxCode, setJsxCode] = useState('export default function App() { return <h1>Hello</h1>; }');
  const [cssCode, setCssCode] = useState('body { font-family: sans-serif; }');

  const params = useParams();
  const sessionId = params.id;

  useEffect(() => {
    if (sessionId) getSession(sessionId);
  }, [sessionId]);

  async function getSession(sId) {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_API}/api/session/${sId}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      const ss = data.session;
      setSession(ss);
      setChats(data.chats);
      setJsxCode(ss.last_jsx || jsxCode);
      setCssCode(ss.last_css || cssCode);
    } catch (error) {
      console.error("Error fetching session:", error);
      alert("Failed to fetch session data.");
    }
    setLoading(false);
  }

  return (
    <div className="h-[calc(100vh-1rem)] w-full pt-15 flex justify-center bg-gray-50 dark:bg-gray-900">
      <Chat
        chats={chats}
        setChats={setChats}
        sessionId={sessionId}
        setSession={setSession}
      />

      {loading || !session ? (
        <div className="flex items-center justify-center w-full text-lg font-medium text-gray-700 dark:text-gray-300">
          Fetching session data...
        </div>
      ) : (
        <SandpackProvider
          template="react"
          files={{
            "/App.js": {
              code: jsxCode,
              active: true,
            },
            "/styles.css": {
              code: cssCode,
            },
          }}
          className="w-full"
        >
          <section className="flex flex-col h-full w-[70vw]">
            <PanelGroup direction="vertical" className="h-full w-full">
              <Panel
                defaultSize={50}
                minSize={20}
                maxSize={80}
                className="h-full w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm"
              >
              <SandpackPreview showRefreshButton className="h-full" />
              {/* <Preview/> */}
              </Panel>
              <PanelResizeHandle className="h-2 w-full bg-gray-200 dark:bg-gray-700 cursor-row-resize hover:bg-gray-300 dark:hover:bg-gray-600" />
              <Panel className="h-full w-full bg-gray-50 dark:bg-gray-900">
                <Code setJsxCode={setJsxCode} setCssCode={setCssCode} />
              </Panel>
            </PanelGroup>
          </section>
        </SandpackProvider>
      )}
    </div>
  );
}