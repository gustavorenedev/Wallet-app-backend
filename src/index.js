// also installed nodemon to reload the application after any change

const express = require('express');
const db = require("./db");
const routesCategories = require("./routes/categories");
const routesUsers = require("./routes/users");
const routesFinances = require("./routes/finances");

const app = express();
app.use(express.json());

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
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

