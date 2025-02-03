const { Router } = require("express");
const TranslatorController = require("../controller/TranslatorController");
const { validateTranslationRequest } = require("../validators");

const translationRoute = Router();
const translateController = new TranslatorController();
translationRoute.post("/", validateTranslationRequest, translateController.translateAndSynthesizeSpeech)

module.exports = translationRoute;