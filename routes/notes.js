
const express = require('express')
const router = express.Router()
const Note = require('../models/note')
const authToken = require('../middleware/authToken')

router.get('/', authToken, async (req, res) => {

    // Ternary expression, kollar url-variabeln ?archived=true
    const isArchived = (req.query.archived) ? true : {$ne: true}

    try {
        const notes = await Note.find({
            createdBy: req.authUser.sub, 
            archived: isArchived} // mongoose "not equals"
        )
        res.send(notes)
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}) 

router.get('/:id', authToken, async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, createdBy: req.authUser.sub })
        if (!note) {
            return res.status(404).send({msg: "Note not found."})
        }
        res.send(note)
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}) 

router.delete('/:id', authToken, async (req, res) => {
    try {
        const note = await Note.deleteOne({ 
            _id: req.params.id, 
            createdBy: req.authUser.sub 
        })

        if (!note) {
            return res.status(404).send({msg: "Note not found."})
        }
        res.send(note)
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
}) 

router.patch('/:id', authToken, async (req, res) => {
    try {
        const updatedNote = await Note.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.authUser.sub}, // villkor för att uppdatera
            req.body, // själva uppdateringen
            { new: true} // returnera den uppdaterade versionen
        )
        res.send({msg: "Note updated", updatedNote: updatedNote})
    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
})

router.post('/', authToken, async (req, res) => {
    try {
        // note är en instans av vår Note-model
        const note = new Note({
            text: req.body.text,
            createdBy: req.authUser.sub
        })
        // vi sparar vår note i databasen och tar emot svaret i newNote
        const newNote = await note.save()

        res.send({ sparade: newNote})

    } catch (error) {
        res.status(500).send({ msg: error.message })
    }

})

module.exports = router
