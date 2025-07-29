"use client"
import { useSandpack } from "@codesandbox/sandpack-react";
import { useState } from "react";


export default function CopyButton() {
  const [state, getState] = useState(false);
  const { sandpack } = useSandpack();

  const handleCopy = async () => {
    getState(true)
    setTimeout(() => {
      getState(false);
    }, 2000);
    try {
      const code = `${sandpack.files["/App.js"].code}
      
      ${sandpack.files["/styles.css"].code}`;
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error("Failed to copy code:", err);
      alert("Copy failed.");
    }
  };

  return (
    <>
      {
        state ? (
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            Copied
          </button >
        ) : (
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            Copy
          </button >
        )
      }
    </>
  );
}
