const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a title for the review'],
    maxlength:100
  },
  text: {
    type: String,
    required: [true, 'Please add some text']
  },
  rating: {
    type: Number,
    min:1,
    max:10,
    required: [true, 'Please add rating between 1 to 10']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

// PREVENT USER FROM SUBMITTING MORE THAN 1 REVIEW PER BOOTCAMP
ReviewSchema.index({bootcamp:1,user:1},{unique:true})

// STATIC METHOD TO GET AVG RATING AND SAVE
ReviewSchema.statics.getAverageRating = async function (bootcampId) {
  const obj = await this.aggregate([
    {
      $match: { bootcamp: bootcampId },
    },
    {
      $group: {
        _id: '$bootcamp',
        averageRating: { $avg: '$rating' }
      }
    }
  ])
  //console.log(obj)
  try {
    await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
      averageRating: Math.ceil(obj[0].averageRating)
    })
  } catch (err) {
    console.log(err)
  }
}

// CALL getAverageRating AFTER SAVE
ReviewSchema.post('save', function () {
  this.constructor.getAverageRating(this.bootcamp)
})

// CALL getAverageRating BEFORE REMOVE
ReviewSchema.pre('save', function () {
  this.constructor.getAverageRating(this.bootcamp)
})


module.exports = mongoose.model('Review', ReviewSchema);