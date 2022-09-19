const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    text: String

}, {timestamps: true})

module.exports = mongoose.model(
    'Note', 
    noteSchema
)

