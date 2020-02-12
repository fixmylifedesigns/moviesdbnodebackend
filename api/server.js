const cors = require("cors")
const express = require("express")
const helmet = require("helmet")

const moviesRouter = require("../router/movies/movieRouter")

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use("/api/", moviesRouter)

server.get("/", (req, res) => {
    res.status(200).json({api: "iq think movie api running"})
})

module.exports = server;

