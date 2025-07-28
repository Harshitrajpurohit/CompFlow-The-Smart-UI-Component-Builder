import React, { useState } from "react";
import {
  SandpackCodeEditor,
  useSandpack,
} from "@codesandbox/sandpack-react";

export default function Code({ setJsxCode, setCssCode }) {
  const { sandpack } = useSandpack();

  const handleChange = (code) => {
    const activePath = sandpack.activePath;
    if (activePath === "/App.js") setJsxCode(code);
    if (activePath === "/styles.css") setCssCode(code);
  };

  return (
    <div className="w-full h-full bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden transition-colors duration-300">
      <SandpackCodeEditor
        showTabs
        showLineNumbers
        wrapContent
        className="w-full h-full bg-gray-50 dark:bg-gray-900 rounded-md"
        onChange={handleChange}
      />
    </div>
  );
}
