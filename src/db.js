//config postgres
const { Pool } = require("pg");

const db = new Pool({
    user: 'docker',
    password: 'docker',
    database: 'finances',
    host: 'localhost',
    port: 5432,
});

// exportando o db
module.exports = db;