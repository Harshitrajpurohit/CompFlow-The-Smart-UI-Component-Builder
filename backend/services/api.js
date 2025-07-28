import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import * as dotenv from "dotenv";

dotenv.config();

export async function generateComponent(prompt, jsxCode = "", cssCode = "") {
  try {
    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash",
      apiKey: process.env.GEMINI_API_KEY,
      temperature: 0.5,
      maxOutputTokens: 2048,
    });

const componentPrompt = `
You are an expert React component generator.

Your task is to generate a fully functional React component with corresponding CSS code based on the user's request.

### Output Format:
Return ONLY a valid JSON object in this exact format:
{
  "jsx": "<Complete React JSX code including necessary imports>",
  "css": "<Complete CSS code for styles.css>",
  "explanation": "<Brief explanation of what this component does>"
}

### JSX Requirements:
- Must be a valid functional React component.
- Must include: import React from "react";
- Must include: import "./styles.css";
- The entire component should be self-contained in a single file.
- Use: export default function App() {}
- Do NOT use extra React files, modules, hooks, or logic.
- Do NOT use TypeScript (use plain JavaScript only).
- Do NOT include external libraries (e.g., Tailwind, Bootstrap, etc.).

### CSS Requirements:
- Use only plain CSS (no SCSS, no styled-components).
- All CSS should go into a single file named: styles.css.

### Output Rules:
- Return ONLY the JSON object in the specified format.
- Do NOT include markdown, code fences, or any extra text.
- Do NOT include any other files, folders, or setup instructions.

### User Request:
${prompt}

### Previous Code Context:
- JSX: ${jsxCode || "N/A"}
- CSS: ${cssCode || "N/A"}

Generate the new component based on the user request.
`.trim();



    const response = await model.invoke(componentPrompt);

    const raw = response.content.trim();
    const cleaned = raw.replace(/^```json/, "").replace(/```$/, "").trim();

    try {
      const parsed = JSON.parse(cleaned);
      return parsed;
    } catch {
      return cleaned;
    }
  } catch (error) {
    console.error("LangChain Gemini Error:", error.message);
    return { error: "Component generation failed" };
  }
}
