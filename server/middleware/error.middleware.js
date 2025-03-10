import AppError from "../utils/error.utils.js"

const errorMiddleware = (err, req, res, next) => {
    let error = err

    if (!(error instanceof AppError)) {

        const message = error.message || "Something went wrong!"
        console.log(message)
        error = new AppError(message, 500)
    }

    const response = {
        ...error,
        message: error.message,
        ...(process.env.NODE_ENV === "development" && { stack: error.stack })
    }

    console.log(error)

    return res.status(error.statusCode).json(response)
}

export default errorMiddleware