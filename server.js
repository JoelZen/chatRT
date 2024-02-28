const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const router = express.Router()
const http = require('http');
// const http = require('https').createServer(app);
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);
const chatController = require('./src/Message/Controller');
const apiRoute = require('./src/Message/Controller');



const mongoose = require('mongoose');


mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log("MongoDB connected"));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

app.use(express.json());
app.use(express.static(__dirname + '/chat-app'));

app.use('/api', apiRoute);

io.on('connection', (socket) => {
    chatController(socket, io);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/chat-app/index.html')
})
