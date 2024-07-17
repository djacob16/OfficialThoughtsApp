const express = require('express');
require('dotenv').config();

const server = express();
const port = process.env.PORT;

// middleware
server.use(express.json());

server.use((req, res, next) => {
    console.log("path:", req.path, "method:", req.method);
    next();
})

server.listen(port, () => {
    console.log(`listening on port ${port}`);
})


