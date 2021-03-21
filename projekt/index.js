const keys = require("./keys")
const express = require("express");
const cors = require("cors");
const redis = require("redis");
const PORT = 9090;

// Create express app
const app = express();
app.use(cors());
app.use(express.json());

// Create postgres client
const { Pool } = require("pg");

const pgClient = new Pool({
    user: keys.pgUser,
    password: keys.pgPassword,
    database: keys.pgDatabase,
    host: keys.pgHost,
    port: keys.pgPort
});

pgClient.on('error', () => {
    console.log("Postgres not connected");
})

pgClient.query('CREATE TABLE IF NOT EXISTS teams (first_team TEXT, second_team TEXT)').catch( (err) => {
    console.log(err);
})

// Create redis client
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort
    // retry_strategy: () => 1000
});

redisClient.on('connect', () => {
    console.log("Connected to Redis server")
})


// Start app and log config

app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
    console.log(keys);
})

app.get('/', (request, response) => {
    response.status(200).send("OK");
  });