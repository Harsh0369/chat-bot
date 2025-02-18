import { Chat } from "../models/Chat.js";

export const createChat = async (req, res) => {
  try {
    const userId = req.user._id;
    const chat = await Chat.create({
      user: userId,
    });
    res.json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(chats);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const addConversation = async (req, res) => {
    try {
          const chat = await Chat.findById(req.params.id);

          if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
          }

          const conversation = await Conversation.create({
            chat: chat._id,
            question: req.body.question,
            answer: req.body.answer,
          });

          const updatedChat = await Chat.findByIdAndUpdate(
            req.params.id,
            {
              latestMesage: req.body.question,
            },
            {
              new: true,
            }
          );

          res.json({
            conversation,
            updatedChat,
          });
    }
    catch (err)
    {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getConverstation = async (req, res) => { 
    try {
        const conversation = await Conversation.find({ chat: req.params.id });

        if (!chat)
        {
            return res.status(404).json({ message: "Chat not found" });
        }

        res.json(conversation);
    }
    catch (err)
    {
        console.log(err);
        res.status(500).json({ message: "Server Error" });
    }
}

export const deleteChat = async (req, res) => {
    const chat = await Chat.findById(req.params.id);

    if (!chat)
    {
        return res.status(404).json({ message: "Chat not found" });
    }

    if(chat.user.toString() !== req.user._id.toString())
    {
        return res.status(401).json({ message: "Not authorized" });
    }

    await Chat.deleteOne({ _id: req.params.id });

    res.json({ message: "Chat deleted" });
 }
  