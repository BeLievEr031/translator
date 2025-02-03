// CRUD
const { Router } = require("express")
const { validateHistoryRequest, validatePagination } = require("../validators");
const HistoryController = require("../controller/HistoryController");
const historyRouter = Router();
const historyController = new HistoryController();

historyRouter.post("/", validateHistoryRequest, historyController.create)
historyRouter.delete("/", validateHistoryRequest, historyController.delete)
historyRouter.get("/", validatePagination, historyController.fetch)

module.exports = historyRouter;