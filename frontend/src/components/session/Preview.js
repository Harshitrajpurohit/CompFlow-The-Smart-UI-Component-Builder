import React from "react";
import { SandpackPreview } from "@codesandbox/sandpack-react";

export default function Preview() {
  return (
  <SandpackPreview
        showOpenInCodeSandbox={false}
        showRefreshButton
        className="w-full h-full"
      />
  );
}