const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/user')

// Hämta alla användare
router.get('/', async (req, res) => {
    res.send("Users!!")
})

// Skapa ny användare
router.post('/', async (req, res) => {
    try {

        const hashedPassword = await bcrypt.hash(
            req.body.password, 10)

        const user = new User({
            email: req.body.email,
            password: hashedPassword
        })

        res.send(user)


    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
})

module.exports = router