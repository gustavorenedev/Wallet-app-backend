// also installed nodemon to reload the application after any change
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require("./db");
const routesCategories = require("./routes/categories");
const routesUsers = require("./routes/users");
const routesFinances = require("./routes/finances");

const app = express();
app.use(
cors({
    origin: '*',
  })
);
app.use(express.json());

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Olá, essa é a aplicação Wallet App!');
});

app.use("/categories", routesCategories);
app.use("/users", routesUsers);
app.use("/finances", routesFinances);

// Import DB
app.listen(port, () => {
  db.connect().then(() => {
    console.log("DB connected");
  }).catch(error => {
    throw new Error(error);
  });
  console.log(`Example app listening on port ${port}`);
});

