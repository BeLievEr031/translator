const History = require("../model/history.model")
class HistoryController {
    async create(req, res, next) {
        const { userId, from, to } = req.body;
        const newHistory = await History.create({
            userId, from, to
        })

        res.status(200).json({
            success: true,
            message: "History created.",
            history: newHistory
        })
    }

    async delete() {
        const { id, userId } = req.params;
        if (!id || !userId) {
            return res.status(400).json({
                success: false,
                message: "History id required.",
            });
        }

        const isHistory = await History.findOneAndDelete({
            userId,
            _id: id
        })

        if (!isHistory) {
            return res.status(400).json({
                success: false,
                message: "Invalid History.",
            });
        }

        res.status(200).json({
            success: true,
            message: "History deleted",
        })

    }

    async fetch(req, res) {
        const { userid, page, limit, sort } = req.query;
        const histories = await History.find({ userId: userid }).limit(limit).skip((page - 1) * limit)
            .sort({
                createdAt: sort === "asc" ? 1 : -1
            })

        const totalCount = await History.countDocuments({ userId: userid })

        res.status(200).json({
            message: "Histories fetched",
            success: true,
            histories,
            totalCount
        })
    }
}

module.exports = HistoryController;