import jwt from "jsonwebtoken"
import User from "../models/users/userS.js"
import bcrypt from "bcrypt"

export const signUpUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const user = await User.findOne({ email })
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
        const token = await jwt.sign({ id: newUser.id, email: newUser.email }, process.env.SERECT_KEY)

        await newUser.save();
        res.status(200).json({ name: newUser.name, email: newUser.email, token })

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "failed to signup." })
    }
}


export const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "User is not registered." })
        }
        // compare password
        const isEqual = await bcrypt.compare(password, user?.password)
        if (!isEqual) {
            return res.status(401).json({ message: "Your Password is Wrong." })
        }

        // create token 
        const token = await jwt.sign({ id: user.id, email: user.email }, process.env.SERECT_KEY)

        res.status(200).json({ name: user.name, email: user.email, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error." })
    }
}