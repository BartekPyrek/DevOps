const express = require("express");

const app = express();

const PORT = 9090;

app.get('/hello', (req, res) => {
   res.send("Hello World for express server"); 
})

app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`)
});