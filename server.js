const path = require('path')
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser')

const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

const ip = require("ip");
const ip_address = ip.address();

// LOAD ENV VARIABLES
dotenv.config({ path: `${__dirname}/config/config.env` });

// CONNECT TO DATABASE
connectDB();

//ROUTE FILES
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");


const app = express();

// BODY PARSER
app.use(express.json());

// COOKIE PARSER
app.use(cookieParser())

// DEV LOGGING MIDDLEWARE
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// FILE UPLOADING
app.use(fileupload())

// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')))

//MOUNT ROUTER
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);

app.use(errorHandler);

const PORT = process.env.PORT || 1000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${ip_address} port ${PORT} ...`
  )
);

// HANDLE UNHANDLED PROMISE REJECTIONS
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error ${err.message}`);
  // CLOSE SERVER & EXIT PROCESS
  server.close(() => process.exit(1));
});
