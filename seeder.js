const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

// LOAD ENV VARS
dotenv.config({ path: './config/config.env' })

// LOAD MODELS
const Bootcamp = require('./models/Bootcamps')

// CONNECT TO DB
mongoose.connect(process.env.MONGO_URI);

// READ JSON FILES
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'))

// IMPORT INTO DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps)

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