const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/portal";

mongoose.connect(mongoURI, {
    useNewurlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, "MongoDB connection error:"));
db.once('open', () => {
    console.log('Connected to MongoDB server!')
});

module.exports = db;