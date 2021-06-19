const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const { initializeDBConnection } = require('./db/db.connect');

initializeDBConnection();

const app = express();
app.use(bodyParser.json());


const product = require("./product.router.js");
const auth = require("./auth.router.js");
const cart = require("./cart.router.js");
const wishlist = require("./wishlist.router.js");

app.use(cors());
app.use(bodyParser.json());
app.use("/products", product);
app.use("/auth", auth);
app.use("/cart", cart);
app.use("/wishlist", wishlist);

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});