// backend
const express = require("express");
const cors = require("cors");
const redis = require("redis");
const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());

const redisClient = redis.createClient({
    host: "myredis",
    port: 6379
    // retry_strategy: () => 1000
});

const { Pool } = require("pg");

const pgClient = new Pool({
    user: "postgres",
    password: "Pa55w.rd1234",
    database: "postgres",
    host: "mypostgres",
    port: 5432
});

pgClient.on('error', () => {
    console.log("Postgres not connected");
})

pgClient.query('CREATE TABLE IF NOT EXISTS numbers (number INT)').catch( (err) => {
    console.log(err);
})

redisClient.on('connect', () => {
    console.log("Connected to Redis server")
})

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
})
