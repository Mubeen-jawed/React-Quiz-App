import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Form = () => {

  const [quizName, setQuizName] = useState("")
  const [questionNumber, setQuestionNumber] = useState(1)
  const [question, setQuestion] = useState("")
  const [option1, setOption1] = useState("")
  const [option2, setoption2] = useState("")
  const [option3, setoption3] = useState("")
  const [option4, setoption4] = useState("")
  const [answer, setAnswer] = useState("")

  function handleQuizClick() {
    axios.post("http://localhost:8080/createQuiz", {
      questionNumber, question, option1, option2, option3, option4, answer, quizName
    })

    localStorage.setItem("userQuizName", quizName)
  }

  function handleAddQuestionClick() {
    axios.post("http://localhost:8080/addQuestion", {
      questionNumber, question, option1, option2, option3, option4, answer, quizName
    })
    incrementQustionNum()
  }

  function incrementQustionNum() {
    setQuestionNumber(prevValue => prevValue + 1)
  }



  return (
    <div>
      <form>
        <div class="group">
          <input onChange={(e) => { setQuizName(e.target.value) }} type="text" /><span class="highlight"></span><span class="bar"></span>
          <label>Quiz Name</label>
        </div>
        <div class="group">
          <input onChange={(e) => setQuestionNumber(e.target.value)} value={questionNumber} type="number" /><span class="highlight"></span><span class="bar"></span>
          <label>Question #</label>
        </div>
        <div class="group">
          <input onChange={(e) => setQuestion(e.target.value)} type="text" /><span class="highlight"></span><span class="bar"></span>
          <label>Question</label>
        </div>
        <div class="group">
          <input onChange={(e) => setOption1(e.target.value)} type="text" /><span class="highlight"></span><span class="bar"></span>
          <label>Option 1</label>
        </div>
        <div class="group">
          <input onChange={(e) => setoption2(e.target.value)} type="text" /><span class="highlight"></span><span class="bar"></span>
          <label>Option 2</label>
        </div>
        <div class="group">
          <input onChange={(e) => setoption3(e.target.value)} type="text" /><span class="highlight"></span><span class="bar"></span>
          <label>Option 3</label>
        </div>
        <div class="group">
          <input onChange={(e) => setoption4(e.target.value)} type="text" /><span class="highlight"></span><span class="bar"></span>
          <label >Option 4</label>
        </div>
        <div class="group">
          <input onChange={(e) => setAnswer(e.target.value)} type="text" /><span class="highlight"></span><span class="bar"></span>
          <label>Correct Answer</label>
        </div>
        <button onClick={handleAddQuestionClick} type="submit" class="button buttonBlue">Add another Question
          <div class="ripples buttonRipples"><span class="ripplesCircle"></span></div>
        </button>
        <Link to="/quiz" onClick={handleQuizClick} type='submit' class="button buttonRed">Create Quiz
          <div class="ripples buttonRipples"><span class="ripplesCircle"></span></div>
        </Link>
      </form>
    </div>
  )
}

export default Form