const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send({
      success: true,
      data: tasks
    })
  } catch (err) {
    res.send({
      success: false,
      data: err.message
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.send({
      success: true,
      data: newTask
    })
  } catch (err) {
    res.send({
      success: false,
      data: err.message
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(`${req.params.id}`);
    if(!task) {
      throw new Error("No item by that id here!");
    }
    res.send({
      success: true,
      data: task
    })
  } catch (err) {
    res.send({
      success: false,
      data: err.message
    })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(`${req.params.id}`);
    res.send({
      success: true,
      data: task
    })
  } catch (err) {
    res.send({
      success: false,
      data: err.message
    })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.send({
      success: true,
      data: task
    })
  } catch (err) {
    res.send({
      success: false,
      data: err.message
    })
  }
})

module.exports = router;