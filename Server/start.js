import express from "express"
import mongoose from "mongoose"
import config from "config"
import { router } from "./routes/router.js"
import cors from 'cors'

const PORT = config.get('port')
const DB_URI = config.get('mongoURI')

const app = express()
app.use(cors());
app.use(express.json())
app.use('', router)

const startApp = async () => {
    try {
        await mongoose
            .connect(DB_URI)
            .then(() => console.log('MongoDB connected'))
            .catch((err) => console.log('MongoDB error', err))

        app.listen(PORT, () => {console.log("Server started on port ",PORT)})
    } catch (err) {
        console.log(err)
    }
}

startApp()