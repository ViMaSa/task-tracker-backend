require ('dotenv').config();
const { urlencoded } = require('express');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
const taskController = require('./controllers/taskController.js');

const PORT = process.env.PORT;
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true},
  () => console.log('MongoDB connection established:', mongoURI)
);

const db = mongoose.connection;
db.on('error', err => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('Mongo connected: ', process.env.MONGO_URI));
db.on('disconnected', () => console.log('Mongo disconnected'));

const corsOptions = {
  origin: 'https://victor-task-tracker.herokuapp.com/',
  optionsSuccessStatus: 200,
};

app.use(morgan('short'));
app.use(cors(corsOptions));
app.use(urlencoded({extended: true}));
app.use(express.json());

app.use('/tasks', taskController);

app.listen(PORT, () => {
  console.log("App is running");
})