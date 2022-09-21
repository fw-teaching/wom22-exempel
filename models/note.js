const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    text: String,
    createdBy: {
        type: String,
        required: true
    },
    archived: Boolean

}, {timestamps: true})

module.exports = mongoose.model(
    'Note', 
    noteSchema
)

