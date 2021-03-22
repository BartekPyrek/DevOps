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

pgClient.query('CREATE TABLE IF NOT EXISTS matches (id SERIAL PRIMARY KEY, first_team TEXT, second_team TEXT, result TEXT)').catch( (err) => {
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

// Get all matches

app.get('/matches', (request, response) => {
    pgClient.query('SELECT * FROM matches;', (pgError, queryResult) => {
        if (!queryResult.rows){
            response.json([]);
        }
        else{
            response.status(200).json(queryResult.rows);
        }
    });
})

// Get match by id

app.get('/matches/:id', (request, response) => {
    const id = request.params.id;

    pgClient.query('SELECT * FROM matches WHERE id = $1;', [id], (pgError, queryResult) => {
        if (!queryResult.rows){
            response.json([]);
        }
        else{
            response.status(200).json(queryResult.rows);
        }
    });
})

// Post match result for team 1 and team 2
app.get('/:team1,:team2', (request, response) =>{
    const team1 = request.params.team1;
    const team2 = request.params.team2;
    const result = generateResult();

    redisClient.get(result, (err, cachedResult) => {
        if (!cachedResult){
            const computedResult = generateResult();
            pgClient
            .query('INSERT INTO matches (first_team, second_team, result) VALUES ($1, $2, $3)', [team1, team2, computedResult])
            .catch(pgError => console.log(pgError));
            response.status(200).send(`Match result: ${team1} vs. ${team2} -> ${computedResult}  (computed now)`)
        }
        else{
            response.status(200).send(`Match result: ${team1} vs. ${team2} -> ${cachedResult}  (from cache)`)
        }
    });
});

// Generate match results

const generateResult = () => {
    x = getRandomInt(0,5);
    y = getRandomInt(0,5);

    return `${x}:${y}`
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

// TODO: check if teams and result is not the same