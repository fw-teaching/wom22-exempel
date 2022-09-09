// Den här filen är middleware (i det här fallet en route) som en egen fil
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send({title: 'foo'})
})

// Till slut exporterar vi router som en modul så den kan importeras i andra filer
module.exports = router

