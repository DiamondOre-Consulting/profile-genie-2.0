import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from 'express'
import cors from 'cors'
import morgan from "morgan";
import errorMiddleware from "./middleware/error.middleware.js";
import portfolioRouter from "./routes/portfolio.routes.js";

config()

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use(cookieParser())

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    credentials: true
}))

app.use(morgan('dev'))

app.use('/ping', function (req, res) {
    res.send('/pong')
})

app.use('/portfolio', portfolioRouter)

app.all('*', (req, res) => {
    res.status(404).send('OOPS! 404 Page not found')
})

app.use(errorMiddleware)

export default app