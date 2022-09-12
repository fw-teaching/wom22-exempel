
const express = require('express')
const router = express.Router()

const notes = [
    { text: "Köp bröd." },
    { text: "Köp sprit." },
    { text: "Pumpa cykeln."}
]

router.get('/', (req, res) => {
    res.send(notes)
}) 

router.get('/:id', (req, res) => {
    res.send(notes[req.params.id])
}) 

router.post('/', (req, res) => {
    notes.push(req.body)
    res.send({ sparade: req.body})
})

module.exports = router
