const express = require('express')
const router = express.Router()
const MessageModel = require('./Model.js');


function chatController(socket, io) {
    io.on('connection', (socket) => {
        console.log('A user connected');
    
    
        socket.on('join', (username) => {
            socket.username = username;
            
            io.emit('chat message', { username: 'System', message: `${username} has joined the chat` });
        
            // Retrieve previous messages from MongoDB and send to the connecting user
            MessageModel.find({})
                .then((messages) => {
                    socket.emit('load messages', messages);
                })
                .catch((err) => {
                    console.error('Error retrieving messages from MongoDB:', err);
                });
        });
    
        socket.on('chat message', async (msg) => {
        const chatMessage = new MessageModel({ username: socket.username, message: msg });
        
        try {
            await chatMessage.save();
            io.emit('chat message', { username: socket.username, message: msg, timestamp: chatMessage.timestamp });
        } catch (err) {
            console.error('Error saving message to MongoDB:', err.message);
        }
    });
    
    
        socket.on('disconnect', () => {
            if (socket.username) {
                io.emit('chat message', { username: 'System', message: `${socket.username} has left the chat` });
            }
            console.log('User disconnected');
        });
    });
}



module.exports = chatController;
