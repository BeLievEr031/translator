const dotenv = require("dotenv")
dotenv.config();
const GOOGLE_APPLICATION_CREDENTIALS = require("./credentials");
process.env.GOOGLE_APPLICATION_CREDENTIALS = GOOGLE_APPLICATION_CREDENTIALS;
const express = require("express");
const cors = require("cors")
const dbConnect = require("./db/dbConnect");
const translationRoute = require("./routes/translate");
const historyRouter = require("./routes/history");

const app = express();

app.use(express.json({ limit: "1MB" }))
app.use(express.urlencoded({ extended: true, limit: '1MB' }))
app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173"]
}));

app.use("/api/v1/translate", translationRoute)
app.use("/api/v1/history", historyRouter)

const PORT = process.env.PORT;
dbConnect().then(() => {
    app.listen(PORT, () => {
        console.log(`Connected to server at ${PORT}`);
    })
}).catch((err) => {
    console.log(err.message);
    process.exit(1);
})

