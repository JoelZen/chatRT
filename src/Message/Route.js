const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const MessageModel = require('./Model.js');

//API Routes

router.get('/messages', async(req, res) => {
    try{
        const messages = await MessageModel.find({});
        return res.status(200).json(messages);
    }catch(err){
        console.error('Error retrieving messages from Database', err.message);
        return res.status(500).json({ error: 'Internal server error'})
    }
});

router.post('/messages', async(req, res) => {
    const { username, message } = req.body;
    if(!username || !message){
        return res.status(400).json({ error: 'Username and message are required'});
    }

    const chatMessage = new MessageModel({username, message});

    try{
        await chatMessage.save();
        return res.status(201).json({ success: true, message: 'Message successfully sent'});
    }catch(err){
        console.error('Error sending message to Database', err.message);
        return res.status(500).json({ error: 'Internal server error'});
    }
});

module.exports = MessageRoute;