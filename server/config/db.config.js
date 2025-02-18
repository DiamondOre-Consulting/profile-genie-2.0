import mongoose from "mongoose"


const connectionToDB = async () => {
    try {

        const { connection } = await mongoose.connect(process.env.MONGO_URI)

        if (connection) {
            console.log("Database connected")
        }

    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

export default connectionToDB