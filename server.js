//npm install express --save
//const express = require('express')
//npm install pg
//npm i body.parser
//npm install cors
//node server.js
const { createServer } = require('node:http');
const pool = require('./db')
const express = require('express')
const cors = require("cors");


const app = express();
const corsOptions = {
  origin: "http://localhost:4200",
};
const port = 3000;
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));



// const server = createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });



// store all the games done - id, player1, player2, date, result (P1, P2, DRAW)

//ligar FE com este endpoint para obter os resultados passados dos jogos
app.get('/games', async (req, res) => {
    const x = await pool.query('SELECT * FROM "GAMES"')
    res.json(x.rows)
})


// ligar FE c este endpoint para guardar um novo resultado
app.post('/games', async (req, res) => {
    try{
        const winner= req.body.winner;
        const loser= req.body.loser;
        const moves= req.body.moves;
        const draw= req.body.draw;
        console.log(req.body);
        const xx = await pool.query('INSERT INTO "GAMES" (winner, loser, moves, draw) values ($1,$2,$3,$4)', [winner, loser, moves, draw]);
        console.log(xx.rows);
        res.json(xx.rows);
    }catch(e){
        console.log(e)
    }
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})