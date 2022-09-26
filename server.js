
// Vi måste importera express-modulen för att skapa en express-app
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = process.env.PORT || 3030

// Importera dotenv och läs in .env-filen
require('dotenv').config()

// Använd en variabel ur .env-filen
console.log(process.env.DOTENV_WORKS)

// skapa och öppna mongoose-connection till MongoDB Atlas
mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.on('open', () => console.log('Connected to DB!'))

app.use(express.json())

// Tillåt CORS Origin: *
app.use(cors()) 

// Vi visar en statisk sida på site root
app.use('/', express.static(__dirname + '/public'))

// Vi importerar våra routes 
const notesRouter = require('./routes/notes')
app.use('/notes', notesRouter)

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})