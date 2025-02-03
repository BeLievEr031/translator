const mongoose = require("mongoose")

const historySchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },

    from: {
        type: String,
        require: true
    },
    to: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

const History = mongoose.model("History", historySchema)
module.exports = History;