const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
const express = require('express');


const app = express();
const mongoose = require('mongoose');


mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log("MongoDB connected"));

const server = app.listen(3000, () => {
    console.log('Server is running', server.address().port);
})


app.use(express.static(__dirname));