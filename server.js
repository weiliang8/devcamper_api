const express = require("express");
const dotenv = require("dotenv");

// LOAD ENV VARIABLES
dotenv.config({ path: `${__dirname}/config/config.env` });

const app = express();

const PORT = process.env.PORT || 1000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}...`
  )
);
