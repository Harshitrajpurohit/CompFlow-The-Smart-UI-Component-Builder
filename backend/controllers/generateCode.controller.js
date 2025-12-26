import mongoose from "mongoose";
import Session from "../models/sessions/sessionS.js";
import Chat from "../models/chats/chatS.js";
import { generateComponent } from "../services/api.js";

export const generateCode = async (req, res) =>{
    try {
        const { sessionId } = req.params;
        const { prompt } = req.body;

        if (!mongoose.Types.ObjectId.isValid(sessionId)) {
            return res.status(400).json({ message: "Invalid session ID" });
        }
        const session = await Session.findById(sessionId);
        if (!session) {
            res.status(400).json({ message: "Session is Invalid." })
            return;
        }
        const response = await generateComponent(prompt, session.last_jsx, session.last_css)
        if (session?.latest_key) {
            session.latest_key = session.latest_key + 1;

        } else {
            session.latest_key = 1
        }
        session.chats_key.push(session.latest_key)
        session.last_prompt = prompt;
        session.last_jsx = response.jsx;
        session.last_css = response.css;
        session.last_explanation = response.explanation;

        await session.save();

        const chat = new Chat({
            userId: session.userId,
            sessionId: session.id,
            key: session.latest_key,
            prompt: prompt,
            jsx: session.last_jsx,
            css: session.last_css,
            explanation: session.last_explanation,
        })
        const newChat = await chat.save()
        res.status(200).json({newChat, session})

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "some error occure." })
    }
}