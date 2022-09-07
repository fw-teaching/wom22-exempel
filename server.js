const express = require('express')
const app = express()
const PORT = process.env.PORT || 3030

const fooRouter = require('./routes/foo.js')

const runAlways = (req, res, next) => {
    res.locals.myVariable = 'hello from runAlways' // res.locals är ett bra ställe att spara lokala variabler
    console.log(`A request was made to ${req.path}`)
    next()
}

const runSometimes = (req, res, next) => {
    console.log(`sometimes`)
    next()
}

app.use(runAlways)

app.get('/', (req, res) => {
    res.send(`Express says hello! ${res.locals.myVariable}`)
})

app.use('/foo', fooRouter)

app.get('/bar', runSometimes, (req, res) => {
    res.send('bar')
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})