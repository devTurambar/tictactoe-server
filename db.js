const Pool = require('pg').Pool // import pg pool instance
// pg database configuration
const pool = new Pool({
  user: 'postgres', // username 'postgres' by default
  password: 'root', // password of psql
  host: 'localhost',  // host name
  port: 5432, // port number, 5432 by default
  database: 'tictactoe', // database name
});
// export the configuration
module.exports = pool;