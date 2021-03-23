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

pgClient.query('CREATE TABLE IF NOT EXISTS points (id SERIAL PRIMARY KEY, team TEXT, result INT)').catch( (err) => {
    console.log(err);
})

// Create redis client
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort
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
    response.status(200).send("Backend OK");
  });

// Get all teams prediction

app.get('/teams', (request, response) => {
    console.log(`Executed endpoint /teams. Get all teams point prediction.`);

    pgClient.query('SELECT * FROM points;', (pgError, queryResult) => {
        if (!queryResult.rows){
            response.json([]);
        }
        else{
            response.status(200).json(queryResult.rows);
        }
    });
})

// Get team points prediction by id

app.get('/team/:id', (request, response) => {
    const id = request.params.id;
    console.log(`Executed endpoint /team/${id}. Get team points prediction by id.`);

    pgClient.query('SELECT * FROM points WHERE id = $1;', [id], (pgError, queryResult) => {
        if (!queryResult.rows){
            response.json([]);
        }
        else{
            response.status(200).json(queryResult.rows);
        }
    });
})

// Post team point prediction
app.post('/addTeam', (request, response) =>{
    console.log('Executed enpoint /addTeam. Predict points number for ' + request.body.team);
    const team = request.body.team;
    const points = request.body.team;

    redisClient.get(points, (err, cachedResult) => {
        if (cachedResult == null || cachedResult == undefined){
            cachedResult = generateResult();
            redisClient.set(points, parseInt(cachedResult));
            pgClient
            .query('INSERT INTO points (team, result) VALUES ($1, $2)', [team, cachedResult])
            .catch(pgError => console.log(pgError));
            response.status(200).send(`End season points prediction: ${team} -> ${cachedResult}  (computed now)`)
        }
        else{
            response.status(200).send(`End season points prediction: ${team} -> ${cachedResult}  (from cache)`)
        }
    });
});

// Generate team points prediction

const generateResult = () => {
    x = getRandomInt(0,100);
    return x
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }