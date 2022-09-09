
// Vi måste importera express-modulen för att skapa en express-app
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3030

// Vi importerar vor foo-route som en modul
const fooRouter = require('./routes/foo.js')


// Middleware-funktioner
const runAlways = (req, res, next) => {
    res.locals.myVariable = 'hello from runAlways' // res.locals är ett bra ställe att spara lokala variabler
    console.log(`A request was made to ${req.path}`)
    next()
}
const runSometimes = (req, res, next) => {
    console.log(`sometimes`)
    next()
}

// app.use(middleWare) => denna körs för varje request
app.use(runAlways)

app.get('/', (req, res) => {
    res.send(`Express says hello! ${res.locals.myVariable}`)
})

// app.use() också för att använda en router-modul
app.use('/foo', fooRouter)

app.get('/bar', runSometimes, (req, res) => {
    res.send('bar')
})

// app.listen startar upp vår express-server och lyssnar på requests på en viss port.
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})