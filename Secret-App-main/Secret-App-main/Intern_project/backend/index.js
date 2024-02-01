const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors=require('cors');
mongoose.connect('mongodb://127.0.0.1:27017/Secretapp')
    .then(() => {
        console.log('Connected to Database');
    })
    .catch(() => {
        console.log('Not connected to database');
    });
app.use(cors());  
app.use(express.json()); 
app.use(require('./routes/auth.js')); 

app.listen(port, () => {
    console.log('Server is running on port', port);
});
