"use client"
import React, { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { SandpackPreview, SandpackProvider } from "@codesandbox/sandpack-react";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";


export function BentoGridMenu({ setUser }) {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  useEffect(() => {
    const userData = localStorage.getItem("userDetails")
    if (!userData) {
      router.push("/signin")
    }
    const userDetails = JSON.parse(userData)
    setUser(userDetails);
    fetchSessions(userDetails);
  }, [])

  async function fetchSessions(userDetails) {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_API}/api/sessions/${userDetails?.email}`)
      const data = await res.json();
      setSessions(data.sessions);
    } catch (error) {
      alert("Failed to fetch sessions")
    }
    setLoading(false);
  }

    if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-600" />
      </div>
    )
  }

  const openSession = (id) =>{
    return router.push(`/sessions/${id}`)
  }

  return (
    <BentoGrid className="max-w-6xl mx-auto px-5">

      {sessions?.map((item, i) => (
        <div key={i} onClick={() => openSession(item._id)} className="cursor-pointer">
          <SandpackProvider
            template="react"
            key={i}
            files={{
              "/App.js": {
                code: item.last_jsx || `export default function App(){ return <h1>Hello</h1>; }`,
                active: true,
              },
              "/styles.css": {
                code: item.last_css || `body { font-family: sans-serif; }`,
              },
            }}
            className="w-full"
          >
            <BentoGridItem
              key={i}
              id={item?.id}
              title={item?.name}
              description={Date(item?.updatedAt)}
              header={
                <div className="w-full">
                  <SandpackPreview showOpenInCodeSandbox={false} showRefreshButton />
                </div>
              }
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          </SandpackProvider>
        </div>
      ))}

    </BentoGrid>
  );
}

