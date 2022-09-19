const express = require('express'),
    router = express.Router(),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken')

const User = require('../models/user')
const authToken = require('../middleware/authToken')

// Hämta alla användare
router.get('/', authToken, async (req, res) => {
    const users = await User.find()
    res.send(users)
})

// Endpoint på /users/login
router.post('/login', async (req, res) => {
    // Kolla om det finns en användare med det namnet
    const user = await User.findOne({email: req.body.email}).exec()
    if (user == null) {
        return res.status(401).send({msg: "No such user."})
    }

    const match = await bcrypt.compare(req.body.password, user.password)
    if (!match) {
        return res.status(401).send({msg: "Wrong password."})
    }

    const token = jwt.sign({
        sub: user._id, // sub = subject, användar-id
        email: user.email
    }, process.env.JWT_SECRET)

    /* bra sätt att generera random string, i node-konsolen:
        require('crypto').randomBytes(32).toString('hex')
    */
    res.send({ msg: "Login OK", token: token})
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

        const newUser = await user.save()

        res.send(newUser)


    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
})

module.exports = router