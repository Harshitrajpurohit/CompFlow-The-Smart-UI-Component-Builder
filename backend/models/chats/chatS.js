import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Session",
        required: true,
    },
    key: {
        type: Number,
        required: true,
    },
    prompt: {
        type: String,
        default: "",
    },
    jsx: {
        type: String,
        default: "",
    },
    css: {
        type: String,
        default: "",
    },
    explanation: {
        type: String,
        default: "",
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Chat = mongoose.model("Chat", ChatSchema);

export default Chat;
