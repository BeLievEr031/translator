const mongoose = require("mongoose")

const dbConnect = async () => {
    try {
        mongoose.connection.on("error", (error) => {
            console.log("Mongodb connection error", error.message);
            process.exit(1);
        })

        mongoose.connection.on("connected", () => {
            console.log("Mongodb connected!!");
        })

        await mongoose.connect(process.env.DB_URI)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = dbConnect;