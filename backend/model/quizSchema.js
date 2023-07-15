const mongoose = require("mongoose")

const quizSchema = new mongoose.Schema({
  questionNum: Number,
  question: String,
  options: {
    option1: String,
    option2: String,
    option3: String,
    option4: String,
  },
  correctAnswer: String
})

const Quiz = mongoose.model('Quiz', quizSchema)

module.export = Quiz
