const express = require("express");


const app = express();

app.get("/hello", (req, res) => {
    res.send("Hello world!!!!!");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});