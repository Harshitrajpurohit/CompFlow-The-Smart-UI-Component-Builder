"use client";
import { useSandpack } from "@codesandbox/sandpack-react";
import JSZip from "jszip";

export default function DownloadButton() {
  const { sandpack } = useSandpack();

  const handleDownloadZip = async () => {
    const zip = new JSZip();

    zip.file("App.js", sandpack.files["/App.js"].code);
    zip.file("styles.css", sandpack.files["/styles.css"].code);

    const content = await zip.generateAsync({ type: "blob" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "component.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownloadZip}
      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
    >
      Download
    </button>
  );
}
