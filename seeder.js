const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

// LOAD ENV VARS
dotenv.config({ path: './config/config.env' })

// LOAD MODELS
const Bootcamp = require('./models/Bootcamps')
const Course = require('./models/Courses')



// CONNECT TO DB
// await mongoose.connect(process.env.MONGO_URI);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    console.log('MongoDB connected!')
  } catch (err) {
    console.log('Failed to connect to MongoDB', err)
  }
}

connectDB()


// READ JSON FILES
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'))
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'))


// IMPORT INTO DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps)
    await Course.create(courses)

    console.log('Data Imported...')
    process.exit()
  } catch (err) {
    console.log(err)
  }
}

// DELETE DATA
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany()
    await Course.deleteMany()


    console.log('Data Destroyed...')
    process.exit()
  } catch (err) {
    console.log(err)
  }
}

//RUN node seeder -i OR node seeder -d
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}