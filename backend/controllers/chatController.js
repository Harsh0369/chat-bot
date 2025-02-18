import { Chat } from "../models/Chat.js";

export const createChat = async (req, res) => {
    try {
        const userId = req.user._id;
        const chat = await Chat.create({
            user: userId,
        })
        res.json(chat);
        
    }catch(err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
}
 
export const getAllChats = async (req, res) => {
    try {
        const chats = await Chat.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(chats);
    }catch(err) {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
}

export const addConversation = async (req, res) => {
    const chat = await Chat.findById(req.params.id);

    if (!chat)
    {
        return res.status(404).json({ message: "Chat not found" });
    }

 }