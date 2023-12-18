import asyncHandler from "express-async-handler";
import messageModel from "../models/messageModel.js";
import User from "../models/userModels.js";
import ChatModel from "../models/chatModel.js";

const sendMessage = asyncHandler(async(req, res) => {

    // console.log("rrrrrrrr")
    const {content, chatId } = req.body;
    // console.log("content", content, chatId)
    if(!content || !chatId) {
        console.log("Invalid data passed into the request");
        return res.sendStatus (400);
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
      };
    
    // console.log("newMessage",newMessage);
    try{
        var message = await messageModel.create(newMessage);

    message = await message.populate("sender", "name image");
    message = await message.populate("chat");
    message = await User.populate(message, {
        path: 'chat.users',
        select: 'name image email'
    });
     await ChatModel.findByIdAndUpdate(req.body.chatId, {
        latestMessage:message,
     });
    //  console.log("Message",message);

     res.json(message)
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }

});

const allMessages = asyncHandler (async(req,res) => {
try{
    // console.log("dfssdfsd",req.params.chatId,"req.params.chatId")
const messages = await messageModel.find({chat:req.params.chatId})
    .populate("sender","name image email")
    .populate("chat");
// console.log(messages,"messages")
res.status(200).json({ messages });

} catch (error) {
    res.status(400);
    throw new Error(error.message);
}
})
export {
    sendMessage,
    allMessages
}