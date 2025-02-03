import api from "."


export const translateLanguage = (userId, text, sourceLanguage, targetLanguage) => api.post("/translate", {
    userId, text, sourceLanguage, targetLanguage
})

export const createHistory = (userId, from, to) => api.post("/history", {
    userId, from, to
})

export const getHistory = (userid, page = 1, limit = 25, sort = "asc") => api.get(`/history?userid=${userid}&page=${page}&limit=${limit}&sort=${sort}`)