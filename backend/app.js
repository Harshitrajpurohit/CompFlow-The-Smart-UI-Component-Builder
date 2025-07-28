import express, { json } from "express"
import mongoose from "mongoose"
import cors from "cors"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import ConnectDB from "./models/connectDB.js"
import Session from "./models/sessions/sessionS.js"
import User from "./models/users/userS.js"
import Chat from "./models/chats/chatS.js"
import {generateComponent}  from "./services/api.js"
const app = express()

app.use(cors())

dotenv.config()

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

ConnectDB()

app.get("/", (req, res) => {
    res.send("compflow backend is running.")
})


app.get("/api/sessions/:email", async (req, res) => {
    try {
        const {email}  = req.params;
        if (!email) {
            throw new Error()
        }
        const user = await User.findOne({email})

        if(!user){
            return res.status(401).json("Please login.")
        }

        const sessions = await Session.find({userId:user._id})

        res.status(201).json({sessions})
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Failed to fetch sessions" })
    }
})


app.post("/api/session", async (req, res) => {
    try {
        const { name, email } = req.body;
        if (name === "" || email === "") {
            throw new Error()
        }
         const user = await User.findOne({email})
        if(!user){
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
})

app.get("/api/session/:sessionId", async (req, res) => {
    try {
        const { sessionId } = req.params;
        const session = await Session.findById(sessionId);
        if(!session){
            return res.status(404).json({message:"Session error."})
        }
        const chats = await Chat.find({sessionId})
        
        res.status(200).json({session, chats})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error."})
    }
})

app.post("/api/session/:sessionId", async (req, res) => {
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
})


app.post("/api/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body

        const user = await User.findOne({email})
        if (user) {
            return res.status(400).json({ message: "User already exists with this email." });
        }
        // bcrypt password;
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name,
            email: email,
            password: hashedPassword
        })
        // generate token
        const token = await jwt.sign({id:newUser.id, email:newUser.email},process.env.SERECT_KEY)
        
        await newUser.save();
        res.status(200).json({name : newUser.name, email: newUser.email, token})

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "failed to signup." })
    }
})

app.post("/api/signin",async (req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        
        if(!user){
            return res.status(401).json({message:"User is not registered."})
        }
        // compare password
        const isEqual = await bcrypt.compare(password, user?.password)
        if(!isEqual){
            return res.status(401).json({message:"Your Password is Wrong."})
        }
        
        // create token 
        const token = await jwt.sign({id:user.id, email:user.email},process.env.SERECT_KEY)

         res.status(200).json({name : user.name, email: user.email, token})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error." })
    }
})


app.listen(PORT, () => {
    console.log("backend is running on port:", PORT);
})