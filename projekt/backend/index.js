const keys = require("./keys")
const express = require("express");
const {v4 : uuidv4} = require('uuid');
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

pgClient.query('CREATE TABLE IF NOT EXISTS pointsTeam (id UUID UNIQUE, team TEXT, result INT, PRIMARY KEY (id))').catch( (err) => {
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

    pgClient.query('SELECT * FROM pointsTeam;', (pgError, queryResult) => {
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

    redisClient.exists(id, (err, responseExist) => {
        if(responseExist == 1){
            redisClient.hgetall(id, (err, responseRedis) => {
                if(err){
                    console.log(err)
                }
                else{
                    const data = responseRedis;
                    console.log(`Executed endpoint /team/${id}. Get team points prediction by id. Retrieved from cache: ${data.team}`);
                    response.status(200).send(responseRedis);
                }
            });
        }
        else{
            pgClient.query('SELECT * FROM pointsTeam WHERE id = $1;', [id], (pgError, queryResult) => {
                if (pgError){
                    console.log("No data found in postgres database");
                    response.status(404).send("No data found in postgres database")
                }
                else{
                    const data = queryResult.rows[0];
                    console.log(`Executed endpoint /team/${id}. Get team points prediction by id. Retrieved from database ${data.team}`);
                    response.status(200).json(queryResult.rows[0]);
                }
            });
        }
    })
})

// Post team point prediction
app.post('/addTeam', (request, response) =>{
    console.log('Executed endpoint /addTeam. Predict points number for ' + request.body.team);
    const Id = uuidv4();
    const team = request.body.team;
    const points = generateResult();

    redisClient.hmset(`${Id}` ,{'team': `${team}`, 'result': `${points}`});
    pgClient
    .query('INSERT INTO pointsTeam (id, team, result) VALUES ($1, $2, $3)', [Id, team, points])
    .catch(pgError => console.log(pgError));
    response.status(201).send(`End season points prediction: ${team} -> ${points}`);
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