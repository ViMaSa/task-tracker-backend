const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  taskName: {type: String, required: true},
  priority: {type: Number, required: false},
  description: {type: String, required: true},
  status: {type: String, required: true},
  points: {type: Number, required: true},
}, {timestamps: true});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;