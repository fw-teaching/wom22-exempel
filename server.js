
// Vi måste importera express-modulen för att skapa en express-app
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3030

app.use(express.json())

app.get('/', (req, res) => {
    res.send({ msg: 'Express says hello!'})
})


const notesRouter = require('./routes/notes')
app.use('/notes', notesRouter)


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})