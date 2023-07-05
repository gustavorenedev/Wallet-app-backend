require('dotenv').config();
//config postgres
const { Pool } = require("pg");

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } = process.env;

const db = new Pool({
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: Number(DB_PORT),
});

// exportando o db
module.exports = db;