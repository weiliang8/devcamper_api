const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan')

//ROUTE FILES
const bootcamps = require('./routes/bootcamps')

// LOAD ENV VARIABLES
dotenv.config({ path: `${__dirname}/config/config.env` });

const app = express()

//DEV LOGGING MIDDLEWARE
if(process.env.NODE_ENV==='development'){
  app.use(morgan('dev'))
}

//MOUNT ROUTER
app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.PORT || 1000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT} ...`
  )

);
