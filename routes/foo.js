const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send({title: 'foo'})
})

module.exports = router

