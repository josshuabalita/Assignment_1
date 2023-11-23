const express = require('express');
const app = express();

//import mongodb connection file
const db = require('./db.js');

const PORT = process.env.PORT || 8080;

app.get('/', (req,res) => {
    res.send('Connected to server and good for running!')
})

app.listen(PORT, () => {
    console.log('Server connected on PORT 8080')
})