const express = require("express")
const cors = require('cors')
const mongoose = require("mongoose")
var cookies = require('cookie-parser')

const dbSetup = require("./config/db")()
// const Quiz = require("./model/quizSchema")

const port = 8080
const app = express()
app.use(cookies())

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

const quizListSchema = new mongoose.Schema({
  quizQuestions: [quizSchema],
  quizName: String
})

const QuizList = mongoose.model("QuizList", quizListSchema)

app.use(express.json())
app.use(cors())

// Get Request

app.get("/data", function (req, res) {

  QuizList.find({ quizName: "science test" })
    .then((foundList) => {
      res.send(foundList)
    })
})

// Post Request

app.post("/createQuiz", function (req, res) {

  res.cookie("userQuizName", req.body.quizName, {
    expires: new Date(Date.now() + 100000 * 100000),
    // httpOnly: true
  })

  console.log(req.cookies.userQuizName);

  const quiz = new Quiz({
    questionNum: req.body.questionNumber,
    question: req.body.question,
    options: {
      option1: req.body.option1,
      option2: req.body.option2,
      option3: req.body.option3,
      option4: req.body.option4,
    },
    correctAnswer: req.body.answer
  })

  quiz.save()

  QuizList.findOne({ quizName: req.body.quizName })
    .then((foundList) => {

      if (!foundList) {
        const quizList = new QuizList({
          quizQuestions: [quiz],
          quizName: req.body.quizName
        })

        quizList.save()

      } else {
        foundList.quizQuestions.push(quiz)
        foundList.save()
      }
    })
    .catch((e) => console.log(e))
  // }

})


app.post("/addQuestion", function (req, res) {

  const quiz = new Quiz({
    questionNum: req.body.questionNumber,
    question: req.body.question,
    options: {
      option1: req.body.option1,
      option2: req.body.option2,
      option3: req.body.option3,
      option4: req.body.option4,
    },
    correctAnswer: req.body.answer
  })

  quiz.save()



  QuizList.findOne({ quizName: req.body.quizName })
    .then((foundList) => {
      if (!foundList) {
        var quizList = new QuizList({
          quizQuestions: [quiz],
          quizName: req.body.quizName
        })

        quizList.save()

      } else {
        foundList.quizQuestions.push(quiz)
        foundList.save()

      }
    })
    .catch((e) => console.log(e))

})



app.listen(port, function () {
  console.log(`Server has started on Port ${port}`);
})