import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
    name :{
        type : String,
        required:true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    latest_key: {
        type: Number,
        required: true,
        default:0,
    },
    chats_key: {
        type: [Number],
        default:[],
    },
    last_prompt: {
        type: String,
        default: "",
    },
    last_jsx: {
        type: String,
        default: "",
    },
    last_css: {
        type: String,
        default: "",
    },
    last_explanation: {
        type: String,
        default: "",
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Session = mongoose.model("Session", SessionSchema);

export default Session;
