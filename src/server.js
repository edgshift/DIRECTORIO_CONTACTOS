const express = require('express')
const app = express()

const PORT = process.env.PORT || 3700; 
const controller = require('./Controllers/dircontactosControllers')
const route = require('./Routes/dircontactosRoutes')
const connectDB = require('./Config/database')

app.use(express.json())
app.use('/api/contactos_directorio', route)

connectDB()

app.listen(PORT, () => {
    console.log(`El puerto se encuentra en el servidor ${PORT}`)
})