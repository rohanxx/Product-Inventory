const express = require("express");
const app = express();
const mongoose = require("mongoose");
const products = require("./routes/products");

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


mongoose
  .connect("mongodb://127.0.0.1/products", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  })
  .then(() => console.log("Connected to the database successfully"))
  .catch((err) => console.log("Could not connect to the database", err));

app.use(express.json());

app.use('/api/products', products);


const port =  3000 || process.env.PORT ;

app.listen(port, () => console.log(port));
