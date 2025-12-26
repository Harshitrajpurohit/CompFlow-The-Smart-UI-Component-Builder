import User from "../models/users/userS.js";
import Session from "../models/sessions/sessionS.js";
import Chat from "../models/chats/chatS.js";

export const getAllSession = async (req, res) => {
    try {
        const { email } = req.params;
        if (!email) {
            throw new Error()
        }
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json("Please login.")
        }

        const sessions = await Session.find({ userId: user._id })

        res.status(201).json({ sessions })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Failed to fetch sessions" })
    }
}


export const createNewSession = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (name === "" || email === "") {
            throw new Error()
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json("user not found.")
        }
        const tempSession = new Session({
            name: name,
            userId: user._id,
            latest_key: 0,
        });
        const ses = await tempSession.save();
        res.status(201).json({ sessionId: ses.id })

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "session not created." })
    }
}

export const getAllChatOfSession = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: "Session error." })
        }
        const chats = await Chat.find({ sessionId })

        res.status(200).json({ session, chats })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error." })
    }
}