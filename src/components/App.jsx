import React, { useEffect, useState } from 'react'
import axios from 'axios'
import quizDataArray from '../quizData'

const App = () => {

  const [questionNum, setQuestionNum] = useState(1)
  const [correctAnswerCounter, setCorrectAnswerCounter] = useState(0)
  const [wrongAnswer, setWrongAnswer] = useState([])
  // axios.get("https://quizapi.io/api/v1/questions?apiKey=xinod9vbXdrAmnSThPZHqaTmB3YAaOUJNwJedVtZ&limit=10&difficulty=easy")
  //   .then(res => setQuizData(res.data))
  //   .catch(e => console.log(e))

  // console.log(quizData[0].question);

  let quizData = quizDataArray()
  let totalQuestion = quizData.length


  let handleOptionClick = (e) => {
    let userChoosenAnswer = e.target.textContent

    setQuestionNum((prevValue) => prevValue + 1)

    {
      quizData.filter(data => data.id == questionNum).map(data1 => {
        if (userChoosenAnswer == data1.correctAnswer) {
          setCorrectAnswerCounter(prevValue => prevValue + 1)
          console.log(correctAnswerCounter);
        } else {
          let wrongAnsQuestion = data1.question.text
          setWrongAnswer((prevValue) => [prevValue + wrongAnsQuestion])
          wrongAnswer.join(",")
          console.log(wrongAnswer);
        }
      })
    }

  }

  return (
    <div>

      {/* console.log(data.id); */}
      {/* <button type='button' onclick={window.location.reload()}>Reload</button> */}

      <div className="container">
        <div id="quiz">
          <h1>{questionNum > totalQuestion ? "Result" : "Quiz"}</h1>

          <hr style={{ marginBottom: "20px" }} />


          {quizData.filter(data => data.id == questionNum).map(data1 => {
            return <p id="question">{data1.question.text}</p>
          })}

          {quizData.filter(data => data.id == questionNum).map(data1 => {

            return (
              <div className="button-grp">
                <button onClick={(e) => handleOptionClick(e)} id="btn0"><span id="choice0">{data1.incorrectAnswers[0]}</span></button>
                <button onClick={(e) => handleOptionClick(e)} id="btn1"><span id="choice1">{data1.incorrectAnswers[1]}</span></button>
                <button onClick={(e) => handleOptionClick(e)} id="btn2"><span id="choice2">{data1.incorrectAnswers[2]}</span></button>
                <button onClick={(e) => handleOptionClick(e)} id="btn3"><span id="choice3">{data1.incorrectAnswers[3]}</span></button>
              </div>
            )
          })}

          {/* </div> */}
          {/* }) : console.log("mm")} */}

          {questionNum <= totalQuestion ? (
            <div>
              <hr style={{ marginTop: "50px" }} />


              <footer>
                <p id="progress">Question {questionNum} of {totalQuestion}</p>
              </footer>
            </div>
          ) :

            <div className='score-container'>
              <footer>
                <h2 >Your Score is {correctAnswerCounter} of {totalQuestion}</h2>
              </footer>

              <button id='retry-btn' onClick={() => { setQuestionNum(1); setCorrectAnswerCounter(0); setWrongAnswer([]) }}>Retry</button>

              <h3>Wrong Answers Question:</h3>
              {wrongAnswer.map(answer => {
                return (
                  <ul>
                    <li>{answer}</li>
                  </ul>
                )
              })}
            </div>
          }

        </div>
      </div >

    </div >

  )
}

export default App