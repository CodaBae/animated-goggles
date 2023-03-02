const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name: String,
    type: String,
    quantity: Number,
    price: Number,
    isCompleted: Boolean
})

module.exports = taskSchema