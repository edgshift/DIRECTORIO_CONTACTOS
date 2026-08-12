require('dotenv').config()

const express = require('express')
const connectDB = require('./Config/database')
const routes = require('./Routes/dircontactosRoutes')

const app = express()

const PORT = process.env.PORT || 3700

app.use(express.json())

app.use('/api/contactos_directorio', routes)

const startServer = async () => {
    await connectDB()

    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
    })
}

startServer()